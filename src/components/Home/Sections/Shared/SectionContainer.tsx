import { Container } from '@mantine/core'
import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  id?: string
}

export function SectionContainer({ children, id }: SectionContainerProps) {
  return (
    <Container size={1248} px={24} py={100} id={id}>
      {children}
    </Container>
  )
}
