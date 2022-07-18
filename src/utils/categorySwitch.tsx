import { ReactElement } from 'react'
import { BsBriefcase } from 'react-icons/bs'
import { FaSchool } from 'react-icons/fa'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdOutlineSchool } from 'react-icons/md'
import { VscNotebook } from 'react-icons/vsc'
import { myTheme } from 'styles/theme'

export const categorySwitch: CategorySwitch = {
  'Universidade privada': {
    filter: 'Ensino Superior',
    markerIcon: '/markers/marker_university.svg',
    icon: <MdOutlineSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <MdOutlineSchool size={16} color={myTheme.colors!.brand![7]} />
  },
  'Universidade pública': {
    filter: 'Ensino Superior',
    markerIcon: '/markers/marker_university.svg',
    icon: <MdOutlineSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <MdOutlineSchool size={16} color={myTheme.colors!.brand![7]} />
  },
  'Escola privada': {
    filter: 'Ensino Básico',
    markerIcon: '/markers/marker_school.svg',
    icon: <FaSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <FaSchool size={16} color={myTheme.colors!.brand![7]} />
  },
  'Escola pública': {
    filter: 'Ensino Básico',
    markerIcon: '/markers/marker_school.svg',
    icon: <FaSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <FaSchool size={16} color={myTheme.colors!.brand![7]} />
  },
  Biblioteca: {
    filter: 'Biblioteca',
    markerIcon: '/markers/marker_library.svg',
    icon: <IoLibraryOutline size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <IoLibraryOutline size={16} color={myTheme.colors!.brand![7]} />
  },
  Curso: {
    filter: 'Curso',
    markerIcon: '/markers/marker_course.svg',
    icon: <VscNotebook size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <VscNotebook size={16} color={myTheme.colors!.brand![7]} />
  },
  Coworking: {
    filter: 'Coworking',
    markerIcon: '/markers/marker_coworking.svg',
    icon: <BsBriefcase size={16} color={myTheme.colors!.brand![0]} />,
    iconDark: <BsBriefcase size={16} color={myTheme.colors!.brand![7]} />
  }
}

type CategorySwitch = {
  [key: string]: {
    markerIcon: string
    icon: ReactElement
    iconDark: ReactElement
    filter: string
  }
}
