import { UploadApiOptions } from 'cloudinary'

export const cloudinaryOptions: UploadApiOptions = {
  use_filename: true,
  unique_filename: true,
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  overwrite: true,
  folder: 'encontreduca/covers'
}
