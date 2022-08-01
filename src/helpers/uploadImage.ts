import axios from 'axios'
import { UploadApiResponse } from 'cloudinary'

export type UploadImageValues = {
  folder: string
  imageBase64?: string | ArrayBuffer | null
}

export const uploadImage = async ({
  folder,
  imageBase64
}: UploadImageValues) => {
  try {
    const data: UploadApiResponse = await axios.post('/api/upload-image', {
      folder,
      imageBase64
    })

    console.log('🚀 ~ data', data)

    const { secure_url } = data

    if (!secure_url) throw new Error('Image not uploaded')

    return secure_url
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
