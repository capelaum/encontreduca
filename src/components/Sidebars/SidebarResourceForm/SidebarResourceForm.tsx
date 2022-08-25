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
import { DefaultOverlay } from 'components/Shared/Default/DefaultOverlay'
import { SidebarHeader } from 'components/Shared/Sidebar'
import { showToast, showToastError } from 'components/Shared/ToastMessage'
import { useAuth } from 'contexts/authContext'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { handleResourceFormErrors } from 'helpers/formErrorsHandlers'
import {
  validadePosition,
  validateCategoryId,
  validateImageFile,
  validatePhone,
  validateWebsite
} from 'helpers/validate'
import { createResource } from 'lib/resourcesLib'
import { useEffect, useState } from 'react'
import { GiStarsStack } from 'react-icons/gi'
import { IoIosSend } from 'react-icons/io'
import { MdHelp } from 'react-icons/md'
import { ResourceFormValues } from 'types/forms'
import { LatLngLiteral } from 'types/googleMaps'
import { getCategoriesSelectData } from 'utils/modalSelecDataFormatter'
import { CoverDropzone } from './CoverDropzone'
import { Local } from './Local'
import { ResourceContact } from './ResourceContact'
import { ResourceInfo } from './ResourceInfo'

interface ResourceFormProps {
  isCreateResource?: boolean
}

export function SidebarResourceForm({ isCreateResource }: ResourceFormProps) {
  const { setCreateResourceOpened, setChangeResourceOpened } = useSidebar()
  const {
    resource,
    categories,
    setResource,
    getResourceDiff,
    createResourceChanges
  } = useResource()

  const { user } = useAuth()

  const { currentLocation } = useMap()

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [isLoading, setIsLoading] = useState(false)
  const [localPosition, setLocalPosition] = useState<LatLngLiteral>(
    resource?.position ?? currentLocation
  )

  const [cover, setCover] = useState<File | null>(null)

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
      cover: null,
      categoryId: resource ? resource.categoryId.toString() : '',
      position: resource ? resource.position : currentLocation
    },

    validateInputOnChange: [
      'name',
      'address',
      'phone',
      'website',
      'categoryId'
    ],

    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nome muito curto' : null),
      address: (value) =>
        value.trim().length < 4 ? 'Endereço muito curto' : null,
      phone: (value: string) => validatePhone(value),
      website: (value: string) => validateWebsite(value),
      categoryId: (value: string) =>
        validateCategoryId(value, resourceCategories),
      cover: () => (isCreateResource ? validateImageFile(cover) : null),
      position: (value) => validadePosition(value)
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
        cover: null,
        categoryId: resource.categoryId.toString(),
        position: resource.position
      })

      setLocalPosition(resource.position)
    }
  }, [resource])

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true)

    if (!user) {
      setIsLoading(false)

      showToastError({
        title: 'É necessário estar logado para criar/editar um recurso',
        description: 'Por favor, faça login para continuar'
      })

      return
    }

    form.values.position = localPosition

    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('address', values.address)
    formData.append('categoryId', values.categoryId.toString())
    formData.append('name', values.name)
    formData.append('latitude', localPosition.lat.toString())
    formData.append('longitude', localPosition.lng.toString())

    if (values.phone) formData.append('phone', values.phone)
    if (values.website) formData.append('website', values.website)
    if (cover) formData.append('cover', cover)

    try {
      if (!resource) {
        await createMutation.mutateAsync(formData)
      }

      if (resource && !isCreateResource) {
        const resourceDiff = getResourceDiff(form, cover)

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
          await createResourceChanges(resourceDiff, cover)
        }
      }
    } catch (error) {
      setIsLoading(false)

      showToastError({
        title: isCreateResource
          ? 'Erro ao criar recurso'
          : 'Erro ao editar recurso',
        description: (error as Error).message
      })

      return
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
          categoryId={form.values.categoryId}
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
            setCover={setCover}
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
