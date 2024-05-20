import { makeAutoObservable } from "mobx";
import { LngLat } from "@yandex/ymaps3-types";
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO";
import MapLocation from "../../../models/General/MapLocation";
import Filter from "../../../models/General/Filter";



export class MapStore {

    currentLocation: MapLocation = { zoom: 5, center: [20, 20] }
    filter: Filter = {} as Filter
    markers: MarkerInfoDTO[] = []
    formIsOpened: boolean = false

    get FormIsOpened() {
        return this.formIsOpened
    }

    get CurrrentLocation() {
        return { ...this.currentLocation }
    }

    get Filter() {
        return { ...this.filter }
    }
    constructor() {
        makeAutoObservable(this)
    }

    async SetFilter(newFilter: Filter) {
        this.filter = newFilter
    }

    async addMarker(marker: MarkerInfoDTO) {

        if (this.markers.length == 50) {
            this.markers.shift()
        }

        this.markers = [...this.markers, marker]
    }

    async getMarkers(markers: MarkerInfoDTO[]) {
        this.markers = markers
    }

    async updateLocation(location: MapLocation) {
        this.currentLocation = location
    }

}