import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { cloudinaryOptions } from 'config/cloudinaryOptions'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseError = {
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadApiResponse | ResponseError>
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed'
    })
  }

  const { imageBase64, folder } = req.body
  console.log('🚀 ~ imageBase64', imageBase64)

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    secure: true
  })

  const result = await cloudinary.uploader.upload_large(
    imageBase64,
    { ...cloudinaryOptions, folder, chunk_size: 1000000 },
    (error, response) => {
      if (error) {
        res.status(500).json({
          message: error.message
        })
      }

      return response
    }
  )

  res.status(200).json(result)
}
