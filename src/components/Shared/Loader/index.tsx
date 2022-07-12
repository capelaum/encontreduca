import { Center, Title } from '@mantine/core'
import { BallTriangle } from 'react-loader-spinner'
import { theme } from 'styles/theme'
import styles from './styles.module.scss'

export function Loader() {
  return (
    <Center
      className={styles.container}
      sx={{ backgroundColor: theme.colors!.brand![7] }}
    >
      <BallTriangle
        height="100"
        width="100"
        color={theme.colors!.cyan![4]}
        ariaLabel="loading-indicator"
      />
      <Title
        order={1}
        className={styles.title}
        sx={{ color: theme.colors!.cyan![4] }}
      >
        Carregando...
      </Title>
    </Center>
  )
}
