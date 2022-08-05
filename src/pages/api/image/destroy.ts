import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { cloudinaryOptions } from 'config/cloudinaryOptions'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseError = {
  message?: string
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  secure: true
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadApiResponse | ResponseError>
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({
      message: 'Method not allowed'
    })
  }

  const { imagePath } = req.body

  const result = await cloudinary.uploader.destroy(
    imagePath,
    { ...cloudinaryOptions },
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
