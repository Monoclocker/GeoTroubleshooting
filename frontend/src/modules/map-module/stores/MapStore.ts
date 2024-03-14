import { makeAutoObservable } from "mobx";
import { IMarkerInfo } from "../../../vite-env";
import { LngLat } from "@yandex/ymaps3-types";

export class MapStore {

    markers: IMarkerInfo[] = []

    markerFormCoordinates?: LngLat

    formIsOpened: boolean = false

    get Marker() {
        return [this.markerFormCoordinates?.[0], this.markerFormCoordinates?.[1]] as LngLat
    }

    constructor() {
        makeAutoObservable(this)
    }

    addMarker(marker: IMarkerInfo) {

        if (this.markers.length == 50) {
            this.markers.shift()
        }

        this.markers = [...this.markers, marker]
    }

    getMarkers(markers: IMarkerInfo[]) {
        this.markers = markers
    }

    setFormData(coordinates?: LngLat) {
        this.markerFormCoordinates = coordinates
    }

    showForm(state: boolean) {
        this.formIsOpened = state
    }

}