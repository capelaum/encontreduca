import { ModalSelectData } from 'types/motives'

export const validateWebsite = (website: string) => {
  if (website.length === 0) return 'Website é obrigatório'

  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

  return regex.test(website) ? null : 'Website inválido'
}

export const validateCloudinaryImage = (secureUrl: string) => {
  if (secureUrl.length === 0) return 'Imagem de capa é obrigatória'

  // regex to check if url is in format https://res.cloudinary.com/capelaum/image/upload/v1659357663/encontreduca/covers/vawlb6vhnyggnzhojrur.jpg
  const regex =
    /^https:\/\/res.cloudinary.com\/capelaum\/image\/upload\/v\d+\/encontreduca\/covers\/*.(jpg|png|webp|jpeg|gif)$/

  return regex.test(secureUrl) ? null : 'Imagem de capa inválida'
}

export const validatePhone = (value: string) => {
  if (value.length < 14) return 'Telefone é obrigatório'

  const regex = /\(\d{2}\) \d{4,5}-\d{4}/
  return regex.test(value)
    ? null
    : 'Telefone inválido - formato (00) 00000-0000'
}

export const validateCategoryId = (
  value: string,
  resourceCategories: ModalSelectData[]
) => {
  if (value.length === 0) return 'Categoria é obrigatória'

  const founCategory = resourceCategories.find(
    (category) => category.value === value
  )

  return founCategory ? null : 'Categoria inválida'
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
