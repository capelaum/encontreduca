import { Loader, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useMap } from 'contexts/mapContext'
import { useState } from 'react'
import { MdMyLocation } from 'react-icons/md'
import { SideButton } from './SideButton'

export function CurrentLocation() {
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const { moveToLocation, isCurrentLocationAllowed, currentLocation } = useMap()
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
      onClick={() => {
        if (!isCurrentLocationAllowed) {
          moveToLocation(currentLocation)
        }

        if (isCurrentLocationAllowed) {
          handleMoveToCurrentLocation()
        }
      }}
      text={
        isCurrentLocationAllowed
          ? 'Centralizar em sua posição atual'
          : 'Centralizar'
      }
    >
      {disabled ? (
        <Loader
          size="sm"
          color={dark ? theme.colors.cyan[3] : theme.colors.brand[7]}
        />
      ) : (
        <MdMyLocation size={22} />
      )}
    </SideButton>
  )
}
