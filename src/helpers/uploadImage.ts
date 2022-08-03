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
    const response = await axios.post('/api/upload-image', {
      folder,
      imageBase64
    })

    if (response.status !== 200) throw new Error('Error uploading image')

    const { data }: { data: UploadApiResponse } = response

    if (!data) throw new Error('Image not uploaded')

    return data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
