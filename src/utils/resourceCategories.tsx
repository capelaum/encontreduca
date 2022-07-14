import { BsBriefcase } from 'react-icons/bs'
import { FaSchool } from 'react-icons/fa'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdOutlineSchool } from 'react-icons/md'
import { VscNotebook } from 'react-icons/vsc'
import { myTheme } from 'styles/theme'

export const resourceCategories: CategoriesType = {
  private_university: {
    name: 'Universidade Privada',
    icon: <MdOutlineSchool size={18} color={myTheme.colors!.brand![0]} />
  },
  public_university: {
    name: 'Universidade Pública',
    icon: <MdOutlineSchool size={18} color={myTheme.colors!.brand![0]} />
  },
  private_school: {
    name: 'Escola Privada',
    icon: <FaSchool size={16} color={myTheme.colors!.brand![0]} />
  },
  public_school: {
    name: 'Escola Pública',
    icon: <FaSchool size={16} color={myTheme.colors!.brand![0]} />
  },
  library: {
    name: 'Biblioteca',
    icon: <IoLibraryOutline size={18} color={myTheme.colors!.brand![0]} />
  },
  course: {
    name: 'Curso',
    icon: <VscNotebook size={18} color={myTheme.colors!.brand![0]} />
  },
  coworking: {
    name: 'Coworking',
    icon: <BsBriefcase size={18} color={myTheme.colors!.brand![0]} />
  }
}

type CategoriesType = {
  [key: string]: CategoryType
}

type CategoryType = {
  name: string
  icon: React.ReactElement
}
