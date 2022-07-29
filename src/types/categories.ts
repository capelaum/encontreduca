import { ReactNode } from 'react'

export type CategoryType = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type CategorySwitch = {
  [key: string]: {
    markerIcon: string
    iconCyan: ReactNode
    iconWhite: ReactNode
    iconBlue: ReactNode
    iconBlueDark: ReactNode
    filter: Filter
  }
}

export type Filter =
  | 'Ensino Básico'
  | 'Ensino Superior'
  | 'Biblioteca'
  | 'Curso'
  | 'Coworking'

export type CategoryFilter = {
  categoryNames: string[]
  name: Filter
  iconCyan: ReactNode
  iconWhite: ReactNode
  iconBlue: ReactNode
  iconBlueDark: ReactNode
}
