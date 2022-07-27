import { Anchor, CSSObject, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'

interface NavLinkProps {
  text: string
  link: string
}

export function NavLink({ text, link }: NavLinkProps) {
  const largeScreen = useMediaQuery('(min-width: 480px)', false)
  const theme = useMantineTheme()

  const anchorStyles = (): CSSObject => ({
    color: theme.white,
    transition: '0.3s ease-out',
    '&:hover': { color: theme.colors.cyan[3] }
  })

  return (
    <Link href={link} passHref>
      <Anchor
        component="a"
        variant="text"
        size={largeScreen ? 'md' : 'sm'}
        sx={anchorStyles}
      >
        {text}
      </Anchor>
    </Link>
  )
}
