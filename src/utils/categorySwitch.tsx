import { BsBriefcaseFill } from 'react-icons/bs'
import { FaPencilRuler, FaSchool } from 'react-icons/fa'
import { IoLibrarySharp } from 'react-icons/io5'
import { MdSchool } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { CategorySwitch } from 'types/categories'

export const categorySwitch: CategorySwitch = {
  'Universidade privada': {
    filter: 'Ensino Superior',
    markerIcon: '/markers/marker_university.svg',
    iconCyan: <MdSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <MdSchool size={16} color={myTheme.white} />,
    iconBlue: <MdSchool size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <MdSchool size={16} color={myTheme.colors!.brand![9]} />
  },
  'Universidade pública': {
    filter: 'Ensino Superior',
    markerIcon: '/markers/marker_university.svg',
    iconCyan: <MdSchool size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <MdSchool size={16} color={myTheme.white} />,
    iconBlue: <MdSchool size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <MdSchool size={16} color={myTheme.colors!.brand![9]} />
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
    iconCyan: <IoLibrarySharp size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <IoLibrarySharp size={16} color={myTheme.white} />,
    iconBlue: <IoLibrarySharp size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <IoLibrarySharp size={16} color={myTheme.colors!.brand![9]} />
  },
  Curso: {
    filter: 'Curso',
    markerIcon: '/markers/marker_course.svg',
    iconCyan: <FaPencilRuler size={14} color={myTheme.colors!.brand![0]} />,
    iconWhite: <FaPencilRuler size={14} color={myTheme.white} />,
    iconBlue: <FaPencilRuler size={14} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: <FaPencilRuler size={14} color={myTheme.colors!.brand![9]} />
  },
  Coworking: {
    filter: 'Coworking',
    markerIcon: '/markers/marker_coworking.svg',
    iconCyan: <BsBriefcaseFill size={16} color={myTheme.colors!.brand![0]} />,
    iconWhite: <BsBriefcaseFill size={16} color={myTheme.white} />,
    iconBlue: <BsBriefcaseFill size={16} color={myTheme.colors!.brand![7]} />,
    iconBlueDark: (
      <BsBriefcaseFill size={16} color={myTheme.colors!.brand![9]} />
    )
  }
}
