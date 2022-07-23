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
    iconCyan: <MdOutlineSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <MdOutlineSchool size={16} color={myTheme.white} />,
    iconBlue: <MdOutlineSchool size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: (
      <MdOutlineSchool size={16} color={myTheme.colors!.brand![9]} />
    )
  },
  'Universidade pública': {
    filter: 'Ensino Superior',
    markerIcon: '/markers/marker_university.svg',
    iconCyan: <MdOutlineSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <MdOutlineSchool size={16} color={myTheme.white} />,
    iconBlue: <MdOutlineSchool size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: (
      <MdOutlineSchool size={16} color={myTheme.colors!.brand![9]} />
    )
  },
  'Escola privada': {
    filter: 'Ensino Básico',
    markerIcon: '/markers/marker_school.svg',
    iconCyan: <FaSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <FaSchool size={16} color={myTheme.white} />,
    iconBlue: <FaSchool size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <FaSchool size={16} color={myTheme.colors!.brand![9]} />
  },
  'Escola pública': {
    filter: 'Ensino Básico',
    markerIcon: '/markers/marker_school.svg',
    iconCyan: <FaSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <FaSchool size={16} color={myTheme.white} />,
    iconBlue: <FaSchool size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <FaSchool size={16} color={myTheme.colors!.brand![9]} />
  },
  Biblioteca: {
    filter: 'Biblioteca',
    markerIcon: '/markers/marker_library.svg',
    iconCyan: <IoLibraryOutline size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <IoLibraryOutline size={16} color={myTheme.white} />,
    iconBlue: <IoLibraryOutline size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: (
      <IoLibraryOutline size={16} color={myTheme.colors!.brand![9]} />
    )
  },
  Curso: {
    filter: 'Curso',
    markerIcon: '/markers/marker_course.svg',
    iconCyan: <VscNotebook size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <VscNotebook size={16} color={myTheme.white} />,
    iconBlue: <VscNotebook size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <VscNotebook size={16} color={myTheme.colors!.brand![9]} />
  },
  Coworking: {
    filter: 'Coworking',
    markerIcon: '/markers/marker_coworking.svg',
    iconCyan: <BsBriefcase size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <BsBriefcase size={16} color={myTheme.white} />,
    iconBlue: <BsBriefcase size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <BsBriefcase size={16} color={myTheme.colors!.brand![9]} />
  }
}

type CategorySwitch = {
  [key: string]: {
    markerIcon: string
    iconCyan: ReactElement
    iconWhite: ReactElement
    iconBlue: ReactElement
    iconBlueDark: ReactElement
    filter: string
  }
}
