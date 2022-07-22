import { MantineThemeOverride } from '@mantine/core'

export const myTheme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif',
  colorScheme: 'dark',
  primaryColor: 'brand',
  colors: {
    brand: [
      '#66d9e8',
      '#66d9e8',
      '#66d9e8',
      '#66d9e8',
      '#66d9e8',
      '#66d9e8',
      '#1A1E3D',
      '#282C4D', // primary
      '#12173E',
      '#030518' // darker-blue
    ],
    dark: [
      '#ffffff',
      '#acaebf',
      '#8c8fa3',
      '#ADB5BD', // gray 500
      '#4d4f66',
      '#282C4D', // primary
      '#191D40',
      '#282C4D',
      '#0c0d21',
      '#01010a'
    ],
    brandLight: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96',
      '#495057',
      '#343a40',
      '#212529'
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
    sm: 8,
    md: 20,
    lg: 40,
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
