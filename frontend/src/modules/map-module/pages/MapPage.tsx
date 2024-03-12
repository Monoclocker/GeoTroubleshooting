import { useStores } from "../../../hooks/RootContext";
import MapComponent from "../components/MapComponent";
import { MarkerForm } from "../components/MarkerForm";
import { DomEvent, LngLat } from "@yandex/ymaps3-types";
import { useState } from "react";

export const MapPage = () => {

    const [coordinates, setCoordinates] = useState<LngLat>({} as LngLat)

    const { authStore } = useStores()


    const setProps = (event: DomEvent) => {
        setCoordinates(event.coordinates)
    }

    return (<>

        <MapComponent updateProps={setProps} />
        
        
    </>)
}

