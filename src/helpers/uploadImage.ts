import axios from 'axios'
import { UploadApiResponse } from 'cloudinary'

export const uploadImage = async (imageBase64: string | ArrayBuffer | null) => {
  const { data }: { data: UploadApiResponse } = await axios.post(
    '/api/upload-image',
    { imageBase64 }
  )

  const { secure_url } = data

  return secure_url
}
