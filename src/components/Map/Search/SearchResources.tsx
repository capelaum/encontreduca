import {
  Autocomplete,
  AutocompleteItem,
  createStyles,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { AutoCompleteItem } from 'components/Shared/AutoCompleteItem'
import { useMap } from 'contexts/mapContext'
import { useResource } from 'contexts/resourceContext'
import { useSidebar } from 'contexts/sidebarContext'
import { useState } from 'react'
import { ResourceType } from 'types/resources'
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

export function SearchResources() {
  const [value, setValue] = useState('')

  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { classes } = useAutoCompleteStyles(dark)

  const { moveToLocation } = useMap()
  const { setResourceOpened, setMenuOpened } = useSidebar()
  const { resources, filterResources, setResource } = useResource()
  const filteredResources = filterResources(resources!)

  const data = filteredResources.map((item) => ({
    ...item,
    value: item.name,
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
      filter={(_, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.address.toLowerCase().includes(value.toLowerCase().trim())
      }
      classNames={classes}
      sx={{
        width: '420px',
        flex: 1,
        input: {
          color: dark ? theme.white : theme.colors.brand[7],
          // border: '1px solid red',
          backgroundColor: dark ? theme.colors.brand[7] : theme.colors.gray[0],
          // border: 'none',
          '&:focus': {
            outline: 'none',
            border: 'none'
          }
        }
      }}
    />
  )
}
