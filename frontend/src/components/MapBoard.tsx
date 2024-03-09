import { Col, Row } from "antd";
import MapComponent from "./MapComponent";
import { MarkerForm } from "./MarkerForm";
import { DomEvent, LngLat } from "@yandex/ymaps3-types";
import { useState } from "react";
import { useStores } from "./RootContext";

export const MapDashboard = () => {

    const [coordinates, setCoordinates] = useState<LngLat>({} as LngLat)

    const { authStore } = useStores()


    const setProps = (event: DomEvent) => {
        setCoordinates(event.coordinates)
    }

    return (<>

        <MapComponent updateProps={setProps} />


        <MarkerForm coordinates={coordinates} username={authStore.getUser.userName} />
        
        
    </>)
}

