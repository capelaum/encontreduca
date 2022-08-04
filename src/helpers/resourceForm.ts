import type { FormErrors } from '@mantine/form'
import { showToastError } from 'components/Shared/ToastMessage'

export const handleResourceFormErrors = (errors: FormErrors) => {
  if (errors.name) {
    showToastError({
      title: 'Nome inválido',
      description: 'Nome do recurso deve ter mais de 3 caracteres.'
    })
  }

  if (errors.address) {
    showToastError({
      title: 'Endereço inválido',
      description: 'Endereço deve ter mais de 4 caracteres.'
    })
  }

  if (errors.phone) {
    showToastError({
      title: 'Telefone inválido',
      description: 'Telefone deve estar no formato (00) 00000-0000'
    })
  }

  if (errors.website) {
    showToastError({
      title: 'Website inválido',
      description: 'Website deve estar no formato http://www.website.com'
    })
  }

  if (errors.cover) {
    showToastError({
      title: 'Imagem de capa inválida',
      description: 'Imagem de capa é obrigatória.'
    })
  }

  if (errors.category_id) {
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

export const handleProfileFormErrors = (errors: FormErrors) => {
  if (errors.name) {
    showToastError({
      title: 'Nome inválido',
      description: 'Nome deve ter mais de 3 caracteres.'
    })
  }

  if (errors.email) {
    showToastError({
      title: 'Email inválido',
      description: 'Você deve fornecer um email válido.'
    })
  }

  if (errors.avatarUrl) {
    showToastError({
      title: 'Imagem de perfil inválida',
      description: 'Por favor, forneca uma imagem válida.'
    })
  }

  if (errors.resourceWebsite) {
    showToastError({
      title: 'Website inválido',
      description: 'Website deve estar no formato http://www.website.com'
    })
  }

  if (errors.password) {
    showToastError({
      title: 'Senha inválida',
      description: 'Senha deve ter mais de 6 caracteres.'
    })
  }

  if (errors.confirmPassword) {
    showToastError({
      title: 'Senha de confirmação inválida',
      description: 'Senha de confirmação deve ser igual à senha.'
    })
  }
}
