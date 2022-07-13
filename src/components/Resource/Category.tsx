import { Group, Text } from '@mantine/core'
import { BsBriefcase } from 'react-icons/bs'
import { FaSchool } from 'react-icons/fa'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdOutlineSchool } from 'react-icons/md'
import { VscNotebook } from 'react-icons/vsc'
import { theme as myTheme } from 'styles/theme'

export const categories: CategoriesType = {
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

interface CategoryProps {
  category: string
}

export function Category({ category }: CategoryProps) {
  return (
    <Group align="center" spacing={8}>
      {categories[category].icon}

      <Text size="sm" pt={2}>
        {categories[category].name}
      </Text>
    </Group>
  )
}
