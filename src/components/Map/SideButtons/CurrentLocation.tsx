import { Loader, useMantineColorScheme } from '@mantine/core'
import { useMap } from 'contexts/mapContext'
import { useState } from 'react'
import { MdMyLocation } from 'react-icons/md'
import { myTheme } from 'styles/theme'
import { SideButton } from './SideButton'

export function CurrentLocation() {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { moveToLocation } = useMap()
  const [disabled, setDisabled] = useState(false)

  const handleMoveToCurrentLocation = () => {
    setDisabled(true)

    navigator.geolocation.getCurrentPosition((position) => {
      setDisabled(false)

      moveToLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  return (
    <SideButton
      onClick={() => handleMoveToCurrentLocation()}
      text="Alternar tema light/dark"
    >
      {disabled ? (
        <Loader size="sm" color={dark ? 'cyan' : myTheme.colors!.brand![7]} />
      ) : (
        <MdMyLocation size={22} />
      )}
    </SideButton>
  )
}
