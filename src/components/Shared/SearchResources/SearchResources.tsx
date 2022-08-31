import {
  Autocomplete,
  AutocompleteItem,
  createStyles,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import {
  mapSearchInputStyles,
  searchInputStyles
} from 'components/Sidebars/SidebarResourceList/searchInputStyles'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { ResourceType } from 'types/resources'
import { AutoCompleteItem } from './AutoCompleteItem'
import { SearchRightSection } from './SearchRightSection'

const useAutoCompleteStyles = createStyles((theme, dark: boolean) => ({
  dropdown: {
    backgroundColor: dark ? theme.colors.brand[8] : theme.colors.gray[1],
    border: 'none'
  },
  item: {
    '&[data-hovered]': {
      color: theme.colors.brand[7],
      div: {
        color: theme.colors.brand[7]
      },
      backgroundColor: theme.colors.cyan[3]
    }
  }
}))

interface SearchResourcesProps {
  isMap?: boolean
}

export function SearchResources({ isMap }: SearchResourcesProps) {
  const [value, setValue] = useState('')

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useAutoCompleteStyles(dark)

  const { moveToLocation } = useMap()
  const { setResourceOpened, setMenuOpened } = useSidebar()
  const { filteredResources, setResource } = useResource()

  const data = filteredResources.map((resource) => ({
    ...resource,
    value: resource.id.toString(),
    dark,
    theme
  }))

  const handleOnItemSubmit = (item: AutocompleteItem) => {
    const {
      value: itemValue,
      dark: itemDark,
      theme: itemTheme,
      ...resource
    } = item
    setValue(resource.name)
    setResource(resource as ResourceType)
    setMenuOpened(false)
    setResourceOpened(true)
    moveToLocation(item.position)
  }

  return (
    <Autocomplete
      size="md"
      radius="md"
      variant="filled"
      value={value}
      limit={5}
      onChange={setValue}
      placeholder="Busque um recurso"
      aria-label="Busque recursos educacionais"
      transition="pop-top-left"
      transitionDuration={80}
      transitionTimingFunction="ease"
      itemComponent={AutoCompleteItem}
      rightSectionWidth={40}
      rightSection={SearchRightSection({
        value,
        setValue,
        label: 'Busque os recursos educacionais por nome ou endereço'
      })}
      data={data}
      onItemSubmit={(item) => handleOnItemSubmit(item)}
      filter={(filterValue, { name, address }) =>
        name.toLowerCase().includes(filterValue.toLowerCase().trim()) ||
        address.toLowerCase().includes(filterValue.toLowerCase().trim())
      }
      classNames={classes}
      sx={
        isMap
          ? mapSearchInputStyles(theme, dark)
          : searchInputStyles(theme, dark)
      }
    />
  )
}
