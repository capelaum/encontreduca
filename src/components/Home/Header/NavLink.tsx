import { Anchor, CSSObject, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  children: ReactNode
  link: string
  target?: string
  isInvertColors?: boolean
}

export function NavLink({
  children,
  link,
  target,
  isInvertColors
}: NavLinkProps) {
  const largeScreen = useMediaQuery('(min-width: 480px)', false)
  const theme = useMantineTheme()

  const anchorStyles = (): CSSObject => ({
    color: isInvertColors ? theme.colors.cyan[3] : theme.white,
    transition: '0.3s ease-out',
    '&:hover': {
      color: isInvertColors ? theme.colors.cyan[5] : theme.colors.cyan[3]
    }
  })

  if (target) {
    return (
      <Link href={link} passHref>
        <Anchor
          component="a"
          variant="text"
          target={target}
          size={largeScreen ? 'md' : 'sm'}
          sx={anchorStyles}
          rel="noreferrer"
        >
          {children}
        </Anchor>
      </Link>
    )
  }

  return (
    <Anchor
      component="a"
      href={link}
      variant="text"
      size={largeScreen ? 'md' : 'sm'}
      sx={anchorStyles}
      rel="noreferrer"
    >
      {children}
    </Anchor>
  )
}
