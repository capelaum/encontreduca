import { ReactNode } from 'react'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { Message } from './Message'

export interface ShowToastProps {
  title: string
  description: string
  icon?: ReactNode
  dark?: boolean
}

export const showToast = ({
  title,
  description,
  icon,
  dark
}: ShowToastProps) => {
  toast.success(
    <Message title={title} description={description} icon={icon} />,
    {
      icon: false,
      theme: dark ? 'dark' : 'light'
    }
  )
}

export const showToastError = ({ title, description }: ShowToastProps) => {
  toast.error(<Message title={title} description={description} />, {
    icon: <BsExclamationCircleFill size={24} color="#fff" />,
    theme: 'colored'
  })
}
