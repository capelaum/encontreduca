export type LatLng = google.maps.LatLng
export type LatLngLiteral = google.maps.LatLngLiteral

export type DirectionsResult = google.maps.DirectionsResult
export type DirectionsLeg = google.maps.DirectionsLeg

export type GoogleMapsMap = google.maps.Map
export type MapOptions = google.maps.MapOptions
export type MapMouseEvent = google.maps.MapMouseEvent

export type MarkerOptions = google.maps.MarkerOptions
export type GoogleMapsMarker = google.maps.Marker

export type MarkerLabel = google.maps.MarkerLabel

export type Libraries =
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'

export const libraries: Libraries[] = ['places']
