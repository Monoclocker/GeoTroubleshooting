import { makeAutoObservable } from "mobx";
import { LngLat } from "@yandex/ymaps3-types";
import MarkerCreateDTO from "../../../models/Marker/MarkerCreateDTO";
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO";

export class MapStore {

    markers: MarkerInfoDTO[] = []

    markerFormCoordinates?: LngLat

    formIsOpened: boolean = false

    get Marker() {
        return [this.markerFormCoordinates?.[0], this.markerFormCoordinates?.[1]] as LngLat
    }

    constructor() {
        makeAutoObservable(this)
    }

    addMarker(marker: MarkerCreateDTO) {

        if (this.markers.length == 50) {
            this.markers.shift()
        }

        this.markers = [...this.markers, marker]
    }

    getMarkers(markers: MarkerInfoDTO[]) {
        this.markers = markers
    }

    setFormData(coordinates?: LngLat) {
        this.markerFormCoordinates = coordinates
    }

    showForm(state: boolean) {
        this.formIsOpened = state
    }

}