import { Center, Loader, Title } from '@mantine/core'
import styles from './styles.module.scss'

export function MapLoader() {
  return (
    <Center
      className={styles.container}
      sx={(theme) => ({ backgroundColor: theme.colors.brand[7] })}
    >
      <Loader size="xl" color="cyan" />
      <Title
        order={1}
        className={styles.title}
        sx={(theme) => ({ color: theme.colors.cyan[3] })}
      >
        Carregando...
      </Title>
    </Center>
  )
}
