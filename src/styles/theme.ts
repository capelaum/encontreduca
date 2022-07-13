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
    ],
    dark: [
      '#ffffff',
      '#acaebf',
      '#8c8fa3',
      '#ADB5BD', // gray.500
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
    lg: 40,
    xl: 48
  }
}
