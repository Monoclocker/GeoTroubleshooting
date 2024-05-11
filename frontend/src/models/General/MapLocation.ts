import { LngLat } from "@yandex/ymaps3-types"

interface MapLocation {
    placeId: number
    center: LngLat
    zoom: number 
}

export default MapLocation