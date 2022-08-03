import type { FormErrors } from '@mantine/form'
import { showToastError } from 'components/Shared/ToastMessage'

export const handleErrors = (errors: FormErrors) => {
  if (errors.resourceName) {
    showToastError({
      title: 'Nome inválido',
      description: 'Nome do recurso deve ter mais de 3 caracteres.'
    })
  }

  if (errors.resourceAddress) {
    showToastError({
      title: 'Endereço inválido',
      description: 'Endereço deve ter mais de 4 caracteres.'
    })
  }

  if (errors.resourcePhone) {
    showToastError({
      title: 'Telefone inválido',
      description: 'Telefone deve estar no formato (00) 00000-0000'
    })
  }

  if (errors.resourceWebsite) {
    showToastError({
      title: 'Website inválido',
      description: 'Website deve estar no formato http://www.website.com'
    })
  }

  if (errors.resourceCover) {
    showToastError({
      title: 'Imagem de capa inválida',
      description: 'Imagem de capa é obrigatória.'
    })
  }

  if (errors.categoryId) {
    showToastError({
      title: 'Categoria inválida',
      description: 'Categoria é obrigatória.'
    })
  }

  if (errors.latitude || errors.longitude) {
    showToastError({
      title: 'Local inválido',
      description: 'Local válido é obrigatório.'
    })
  }
}
