import axios from 'axios'

export type DestroyImageParams = {
  imageUrl: string
}

export const destroyImage = async ({ imageUrl }: DestroyImageParams) => {
  const imagePath = imageUrl.split('/').slice(7, 10).join('/').split('.')[0]

  try {
    const response = await axios.delete('/api/destroy-image', {
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
