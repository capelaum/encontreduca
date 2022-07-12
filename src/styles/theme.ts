import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif',
  colorScheme: 'dark',
  primaryColor: 'brand',
  colors: {
    brand: [
      '#F3AA9F',
      '#F231A5',
      '#E94335',
      '#0C103E',
      '#030518',
      '#66d9e8',
      '#282C4D',
      '#282C4D',
      '#282C4D',
      '#191D40'
    ]
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
  },
  spacing: {
    xs: 4,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 60
  }
}
