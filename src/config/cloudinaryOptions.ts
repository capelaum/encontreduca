import { UploadApiOptions } from 'cloudinary'

export const cloudinaryOptions: UploadApiOptions = {
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  overwrite: true,
  invalidate: true,
  resource_type: 'image'
}
