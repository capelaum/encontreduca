import {
  Box,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ConfirmButtons } from 'components/Shared/ConfirmButtons'
import { DefaultOverlay } from 'components/Shared/DefaultOverlay'
import { SidebarHeader } from 'components/Shared/SidebarHeader'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { handleError } from 'helpers/resourceForm'
import { uploadImage } from 'helpers/uploadImage'
import {
  validateCategoryId,
  validatePhone,
  validateResourceCover,
  validateWebsite
} from 'helpers/validate'
import { createResource } from 'lib/resourcesLib'
import { useEffect, useState } from 'react'
import { GiStarsStack } from 'react-icons/gi'
import { IoIosSend } from 'react-icons/io'
import { LatLngLiteral } from 'types/googleMaps'
import { ResourceFormValues } from 'types/resources'
import { getCategoriesSelectData } from 'utils/modalSelecDataFormatter'
import { CoverDropzone } from './CoverDropzone'
import { Local } from './Local'
import { ResourceContact } from './ResourceContact'
import { ResourceInfo } from './ResourceInfo'

interface ResourceFormProps {
  isCreateResource?: boolean
}

export function ResourceForm({ isCreateResource }: ResourceFormProps) {
  const { currentLocation } = useMap()

  const [isLoading, setIsLoading] = useState(false)
  const [localPosition, setLocalPosition] =
    useState<LatLngLiteral>(currentLocation)

  const [hasPreview, setHasPreview] = useState(false)
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(
    null
  )

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { setCreateResourceOpened, setChangeResourceOpened } = useSidebar()
  const { resource, categories, user } = useResource()

  const resourceCategories = getCategoriesSelectData(categories)

  const form = useForm<ResourceFormValues>({
    initialValues: {
      resourceName: 'Colégio Militar de Brasília',
      resourceAddress: '902/904 - Asa Norte, Brasília - DF, 70790-020',
      resourcePhone: '(61) 3424-1128',
      resourceWebsite: 'http://www.cmb.eb.mil.br',
      resourceCover: '',
      categoryId: '',
      latitude: currentLocation.lat,
      longitude: currentLocation.lng
    },

    validateInputOnChange: [
      'resourceName',
      'resourceAddress',
      'resourcePhone',
      'resourceWebsite',
      'categoryId'
    ],

    validate: {
      resourceName: (value) => (value.length < 3 ? 'Nome muito curto' : null),
      resourceAddress: (value) =>
        value.length < 4 ? 'Endereço muito curto' : null,
      resourcePhone: (value) => validatePhone(value),
      resourceWebsite: (value) => validateWebsite(value),
      categoryId: (value: string) =>
        validateCategoryId(value, resourceCategories),
      resourceCover: () => validateResourceCover(imageBase64, hasPreview),
      latitude: (value) =>
        value > 90 || value < -90 ? 'Latitude inválida' : null,
      longitude: (value) =>
        value > 180 || value < -180 ? 'Longitude inválida' : null
    }
  })

  useEffect(() => {
    if (resource) {
      form.setValues({
        resourceName: resource.name,
        resourceAddress: resource.address,
        resourcePhone: resource.phone ?? '',
        resourceWebsite: resource.website ?? '',
        categoryId: resource.category_id.toString(),
        resourceCover: resource.cover,
        latitude: +resource.latitude,
        longitude: +resource.longitude
      })
    }
  }, [resource])

  useEffect(() => {
    form.setFieldValue('latitude', localPosition.lat)
    form.setFieldValue('longitude', localPosition.lng)
  }, [localPosition])

  const queryClient = useQueryClient()

  const createMutation = useMutation(createResource, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resources'])
    },
    onError: (error) => {
      showToastError({
        title: 'Erro ao criar recurso',
        description: (error as Error).message
      })
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true)

    try {
      const secure_url = await uploadImage({
        imageBase64,
        folder: 'encontreduca/covers'
      })

      form.values.resourceCover = secure_url
    } catch (error) {
      console.log('ERROR:', (error as Error).message)

      showToastError({
        title: 'Erro ao criar recurso',
        description: 'Não foi possível fazer upload desta imagem 😕'
      })

      setIsLoading(false)
      return
    }

    if (!resource && user) {
      await createMutation.mutateAsync({
        user_id: user.id,
        name: values.resourceName,
        address: values.resourceAddress,
        phone: values.resourcePhone,
        website: values.resourceWebsite,
        category_id: values.categoryId,
        cover: values.resourceCover,
        latitude: values.latitude,
        longitude: values.longitude
      })
    }

    setCreateResourceOpened(false)
    setChangeResourceOpened(false)
    form.reset()

    setIsLoading(false)

    showToast({
      title: isCreateResource
        ? 'Recurso cadastrado com sucesso!'
        : 'Sugestão de alteração de recurso enviada!',
      description: isCreateResource
        ? 'Confira este recurso no Painel de votação.'
        : 'Agradecemos sua sugestão!',
      icon: isCreateResource ? (
        <GiStarsStack size={24} color={theme.colors.brand[8]} />
      ) : (
        <IoIosSend size={24} color={theme.colors.brand[8]} />
      ),
      dark
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <DefaultOverlay visible={isLoading} />

      <Stack my="md" px="md" spacing="md">
        <SidebarHeader
          title={
            isCreateResource
              ? 'Cadastro de recurso'
              : 'Sugerir alteração de recurso'
          }
          closeSidebar={
            isCreateResource
              ? () => setCreateResourceOpened(false)
              : () => setChangeResourceOpened(false)
          }
        />

        <ResourceInfo form={form} />

        <Local
          localPosition={localPosition}
          setLocalPosition={setLocalPosition}
        />

        <ResourceContact form={form} />

        <Box>
          <Text
            mb="xs"
            color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
          >
            Imagem de capa do recurso{' '}
            <Text component="span" color={theme.colors.red[6]}>
              *
            </Text>
          </Text>

          <CoverDropzone
            form={form}
            setHasPreview={setHasPreview}
            setImageBase64={setImageBase64}
          />
        </Box>

        <ConfirmButtons
          onConfirmType="submit"
          onCancel={() => {
            setCreateResourceOpened(false)
            setChangeResourceOpened(false)
          }}
          onConfirmText="Enviar"
        />
      </Stack>
    </form>
  )
}
