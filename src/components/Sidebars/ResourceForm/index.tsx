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
import { uploadImage } from 'helpers/imageHelpers'
import { handleResourceFormErrors } from 'helpers/resourceForm'
import {
  validateCategoryId,
  validateImageBase64,
  validatePhone,
  validateWebsite
} from 'helpers/validate'
import { createResource } from 'lib/resourcesLib'
import { useEffect, useState } from 'react'
import { GiStarsStack } from 'react-icons/gi'
import { IoIosSend } from 'react-icons/io'
import { MdHelp } from 'react-icons/md'
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
  const { setCreateResourceOpened, setChangeResourceOpened } = useSidebar()
  const {
    resource,
    categories,
    user,
    setResource,
    getResourceDiff,
    createResourceChanges
  } = useResource()
  const { currentLocation } = useMap()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [localPosition, setLocalPosition] = useState<LatLngLiteral>(
    resource?.position ?? currentLocation
  )

  const [hasPreview, setHasPreview] = useState(false)
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(
    null
  )

  const resourceCategories = getCategoriesSelectData(categories)

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

      setIsLoading(false)
    }
  })

  const form = useForm<ResourceFormValues>({
    initialValues: {
      name: resource ? resource.name : '',
      address: resource ? resource.address : '',
      phone: resource ? resource.phone ?? '' : '',
      website: resource ? resource.website ?? '' : '',
      cover: resource ? resource.cover : '',
      category_id: resource ? resource.category_id : '',
      latitude: resource ? resource.latitude : currentLocation.lat,
      longitude: resource ? resource.longitude : currentLocation.lng
    },

    validateInputOnChange: [
      'name',
      'address',
      'phone',
      'website',
      'category_id'
    ],

    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nome muito curto' : null),
      address: (value) =>
        value.trim().length < 4 ? 'Endereço muito curto' : null,
      phone: (value: string) => validatePhone(value),
      website: (value: string) => validateWebsite(value),
      category_id: (value: string) =>
        validateCategoryId(value, resourceCategories),
      cover: () =>
        isCreateResource ? validateImageBase64(imageBase64, hasPreview) : null,
      latitude: (value: number) =>
        value > 90 || value < -90 ? 'Latitude inválida' : null,
      longitude: (value: number) =>
        value > 180 || value < -180 ? 'Longitude inválida' : null
    }
  })

  useEffect(() => {
    if (isCreateResource) {
      setResource(null)
    }

    if (resource) {
      form.setValues({
        name: resource.name,
        address: resource.address,
        phone: resource.phone ?? '',
        website: resource.website ?? '',
        cover: resource.cover,
        category_id: resource.category_id,
        latitude: resource.latitude,
        longitude: resource.longitude
      })

      setLocalPosition(resource.position)
    }
  }, [resource])

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true)

    form.values.latitude = localPosition.lat
    form.values.longitude = localPosition.lng

    if (hasPreview && imageBase64) {
      const secure_url = await uploadImage({
        imageBase64,
        folder: 'encontreduca/covers'
      })

      if (!secure_url) {
        showToastError({
          title: 'Erro ao criar recurso',
          description: 'Não foi possível fazer upload desta imagem 😕'
        })

        setIsLoading(false)
        return
      }

      form.values.cover = secure_url
    }

    if (!resource && user) {
      await createMutation.mutateAsync({
        user_id: user.id,
        name: values.name,
        address: values.address,
        phone: values.phone,
        website: values.website,
        category_id: values.category_id,
        cover: values.cover,
        latitude: values.latitude,
        longitude: values.longitude
      })
    }

    if (resource && user && !isCreateResource) {
      const resourceDiff = getResourceDiff(form)

      if (Object.keys(resourceDiff).length === 0) {
        showToast({
          title: 'Cade as alterações?',
          description: 'Não há alterações para serem feitas 🥲',
          icon: <MdHelp size={24} color={theme.colors.brand[8]} />,
          dark
        })

        setIsLoading(false)
        return
      }

      if (Object.keys(resourceDiff).length > 0) {
        await createResourceChanges(resourceDiff)
      }
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
    <form onSubmit={form.onSubmit(handleSubmit, handleResourceFormErrors)}>
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
            resourceCover={resource ? resource.cover : null}
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
