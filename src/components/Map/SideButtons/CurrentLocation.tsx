import { ActionIcon, Loader } from '@mantine/core'
import { useMap } from 'contexts/mapContext'
import { useState } from 'react'
import { MdMyLocation } from 'react-icons/md'

export function CurrentLocation() {
  const { moveToCurrentLocation } = useMap()
  const [disabled, setDisabled] = useState(false)

  const handleOnClick = () => {
    setDisabled(true)

    navigator.geolocation.getCurrentPosition((position) => {
      setDisabled(false)

      moveToCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  return (
    <ActionIcon
      disabled={disabled}
      onClick={handleOnClick}
      variant="filled"
      size="xl"
      color="brand"
      title="Centralizar na posição atual"
      sx={(theme) => ({
        color: theme.colors.cyan[4]
      })}
    >
      {disabled ? (
        <Loader size="sm" color="cyan" />
      ) : (
        <MdMyLocation size={22} />
      )}
    </ActionIcon>
  )
}
