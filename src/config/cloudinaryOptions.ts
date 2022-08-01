import { UploadApiOptions } from 'cloudinary'

export const cloudinaryOptions: UploadApiOptions = {
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  overwrite: true,
  resource_type: 'image'
}
