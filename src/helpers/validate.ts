import { ModalSelectData } from 'types/motives'

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regex.test(String(email).toLowerCase()) ? null : 'Email inválido'
}

export const validateWebsite = (website: string) => {
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

  return website.length === 0 || regex.test(website) ? null : 'Website inválido'
}

export const validatePhone = (value: string) => {
  const regex = /\(\d{2}\) \d{4,5}-\d{4}/

  return value.length === 0 || regex.test(value)
    ? null
    : 'Telefone inválido - formato (00) 00000-0000'
}

export const validateCategoryId = (
  value: string,
  resourceCategories: ModalSelectData[]
) => {
  if (value.length === 0) return 'Categoria é obrigatória'

  const foundCategory = resourceCategories.find(
    (category) => category.value === value
  )

  return foundCategory ? null : 'Categoria inválida'
}

export const validateImageBase64 = (
  imageBase64: string | ArrayBuffer | null,
  hasPreview: boolean
) => {
  if (!hasPreview || !imageBase64) return 'Imagem é obrigatória'

  const regex = /^data:image\/(png|jpg|jpeg|webp);base64,/

  return regex.test(imageBase64.toString())
    ? null
    : 'Imagem possui formato incorreto!'
}

export const validateCloudinaryImage = (secureUrl: string) => {
  if (secureUrl.length === 0) return 'Imagem de capa é obrigatória'

  const regex =
    /^https:\/\/res.cloudinary.com\/capelaum\/image\/upload\/v\d+\/encontreduca\/covers\/*.(jpg|png|webp|jpeg|gif)$/

  return regex.test(secureUrl) ? null : 'Imagem de capa inválida'
}
