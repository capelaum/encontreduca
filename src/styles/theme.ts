import { MantineThemeOverride } from '@mantine/core'

export const myTheme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif',
  colorScheme: 'dark',
  primaryColor: 'brand',
  colors: {
    brand: [
      '#66d9e8', // cyan 300
      '#282C4D',
      '#F3AA9F',
      '#F231A5',
      '#E94335',
      '#0C103E',
      '#030518', // darker-blue
      '#282C4D', // primary
      '#282C4D',
      '#191D40'
    ],
    dark: [
      '#ffffff',
      '#acaebf',
      '#8c8fa3',
      '#ADB5BD', // gray 500
      '#4d4f66',
      '#282C4D', // primary
      '#2b2c3d',
      '#282C4D',
      '#0c0d21',
      '#01010a'
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
    md: 20,
    lg: 32,
    xl: 48
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24
  }
}
