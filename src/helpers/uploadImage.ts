import axios from 'axios'
import { UploadApiResponse } from 'cloudinary'

export const uploadImage = async (
  imageBase64: string | ArrayBuffer | null,
  folder: string
) => {
  try {
    const { data }: { data: UploadApiResponse } = await axios.post(
      '/api/upload-image',
      { imageBase64, folder }
    )

    const { secure_url } = data

    if (!secure_url) throw new Error('Image not uploaded')

    return secure_url
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
