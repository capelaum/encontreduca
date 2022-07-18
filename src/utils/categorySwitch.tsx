import { ReactElement } from 'react'
import { BsBriefcase } from 'react-icons/bs'
import { FaSchool } from 'react-icons/fa'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdOutlineSchool } from 'react-icons/md'
import { VscNotebook } from 'react-icons/vsc'
import { myTheme } from 'styles/theme'

export const categorySwitch: CategorySwitch = {
  'Universidade privada': {
    markerIcon: '/markers/marker_university.svg',
    icon: <MdOutlineSchool size={16} color={myTheme.colors!.brand![0]} />
  },
  'Universidade pública': {
    markerIcon: '/markers/marker_university.svg',
    icon: <MdOutlineSchool size={16} color={myTheme.colors!.brand![0]} />
  },
  'Escola privada': {
    markerIcon: '/markers/marker_school.svg',
    icon: <FaSchool size={16} color={myTheme.colors!.brand![0]} />
  },
  'Escola pública': {
    markerIcon: '/markers/marker_school.svg',
    icon: <FaSchool size={16} color={myTheme.colors!.brand![0]} />
  },
  Biblioteca: {
    markerIcon: '/markers/marker_library.svg',
    icon: <IoLibraryOutline size={16} color={myTheme.colors!.brand![0]} />
  },
  Curso: {
    markerIcon: '/markers/marker_course.svg',
    icon: <VscNotebook size={16} color={myTheme.colors!.brand![0]} />
  },
  Coworking: {
    markerIcon: '/markers/marker_coworking.svg',
    icon: <BsBriefcase size={16} color={myTheme.colors!.brand![0]} />
  }
}

type CategorySwitch = {
  [key: string]: {
    markerIcon: string
    icon: ReactElement
  }
}
