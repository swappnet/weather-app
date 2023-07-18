import type { GeoPoint } from '@/types/global/GeoPoint.types'

const isEqualGeoPoint = (geoPoint1: GeoPoint, geoPoint2: GeoPoint) => {
  return geoPoint1.lat === geoPoint2.lat && geoPoint1.lon === geoPoint2.lon
}

export { isEqualGeoPoint }
