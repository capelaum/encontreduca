import { ReactNode } from 'react'
import { toast } from 'react-toastify'
import { Message } from './Message'

interface ShowToastProps {
  title: string
  description: string
  icon: ReactNode
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
