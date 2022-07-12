export type LatLng = google.maps.LatLng
export type LatLngLiteral = google.maps.LatLngLiteral

export type DirectionsResult = google.maps.DirectionsResult
export type DirectionsLeg = google.maps.DirectionsLeg

export type GoogleMapsMap = google.maps.Map
export type MapOptions = google.maps.MapOptions
export type MapMouseEvent = google.maps.MapMouseEvent

export type MarkerOptions = google.maps.MarkerOptions
export type GoogleMapsMarker = google.maps.Marker

export type MarkerType = {
  id: string
  name: string
  address: string
  location: LatLngLiteral
  phone_number: string
  website: string
  types: string[]
  distance: number
}
