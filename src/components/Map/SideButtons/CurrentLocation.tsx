import { ActionIcon } from '@mantine/core'
import { useMap } from 'contexts/mapContext'
import { useState } from 'react'
import { MdMyLocation } from 'react-icons/md'
import { BallTriangle } from 'react-loader-spinner'
import { theme } from 'styles/theme'

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
      sx={{
        position: 'absolute',
        bottom: '4.25rem',
        right: '1rem',
        color: theme.colors!.cyan![4]
      }}
    >
      {disabled ? (
        <BallTriangle
          width={24}
          height={24}
          color="white"
          ariaLabel="loading-indicator"
        />
      ) : (
        <MdMyLocation size={22} />
      )}
    </ActionIcon>
  )
}
