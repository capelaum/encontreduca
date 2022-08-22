import { myTheme } from 'styles/theme'

export const defaultCenter = {
  lat: -15.793,
  lng: -47.884
}

export const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  disableDefaultUI: true,
  zoomControl: false,
  clickableIcons: false
}

export const mapOptionsLight = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID_LIGHT,
  disableDefaultUI: true,
  zoomControl: false,
  clickableIcons: false
}

export const mapOptionsForm = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  disableDefaultUI: true,
  zoomControl: false,
  clickableIcons: false,
  draggable: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  draggableCursor: null
}

export const mapOptionsFormLight = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID_LIGHT,
  disableDefaultUI: true,
  zoomControl: false,
  clickableIcons: false,
  draggable: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  draggableCursor: null
}

export const mapContainerStyle = {
  width: '100%',
  height: '100vh',
  backgroundColor: myTheme.colors!.brand![7]
}

export const ClustererOtions = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
}
