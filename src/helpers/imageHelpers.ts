import axios from 'axios'
import { UploadApiResponse } from 'cloudinary'

export type UploadImageParams = {
  folder: string
  imageBase64: string | ArrayBuffer
}

export const uploadImage = async ({
  folder,
  imageBase64
}: UploadImageParams) => {
  try {
    const response = await axios.post('/api/image/upload', {
      folder,
      imageBase64
    })

    if (response.status !== 200) throw new Error('Error uploading image')

    const { data }: { data: UploadApiResponse } = response

    if (!data || !data.secure_url) throw new Error('Image not uploaded')

    const { secure_url } = data

    return secure_url
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export type DestroyImageParams = {
  imageUrl: string
}

export const destroyImage = async ({ imageUrl }: DestroyImageParams) => {
  const imagePath = imageUrl.split('/').slice(7, 10).join('/').split('.')[0]

  try {
    const response = await axios.delete('/api/image/destroy', {
      data: {
        imagePath
      }
    })

    if (response.status !== 200) throw new Error('Error deleting image')

    return response
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export type UpdateImageParams = {
  imageUrl: string
  folder: string
  imageBase64: string | ArrayBuffer
}

export const updateImage = async ({
  imageUrl,
  folder,
  imageBase64
}: UpdateImageParams) => {
  const publicId = imageUrl.split('/').pop()!.split('.')[0]

  try {
    const response = await axios.put('/api/image/update', {
      folder,
      imageBase64,
      publicId
    })

    if (response.status !== 200) throw new Error('Error uploading image')

    const { data }: { data: UploadApiResponse } = response

    if (!data || !data.secure_url) throw new Error('Image not uploaded')

    const { secure_url } = data

    return secure_url
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
