//import { useState } from "react";
import { DomEvent, DomEventHandlerObject, LngLat} from "@yandex/ymaps3-types"
import { observer } from "mobx-react-lite"
import { YMap, YMapComponentsProvider, YMapControls, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener, YMapZoomControl } from "ymap3-components"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../services/MapHub"
import { useEffect, useState } from "react"
import { Popover } from "antd"
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO"
import MarkerCreateDTO from "../../../models/Marker/MarkerCreateDTO"
import { MarkerForm } from "./MarkerForm"

const MapComponent = observer(() => {

    const { mapStore } = useStores()
    const { connection } = MapHub()

    const [location, setLocation] = useState({ center: [40, 13], zoom: 5 })

    function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        console.log(event);
        setLocation({ center: [event.coordinates[0], event.coordinates[1]], zoom: 5 })
        mapStore.setFormData(event.coordinates)
        mapStore.showForm(true)
    }

    useEffect(() => {

        connection.invoke("GetMarkers").catch((err) => console.log(err))

        connection.on("InitMarkers", (markers: MarkerInfoDTO[]) => {
            mapStore.getMarkers(markers)
        })

        connection.on("NewMarker", (marker: MarkerCreateDTO) => {
            mapStore.addMarker(marker)
        })

        return () => { }

    }, [])
    

    

    return (

        <div style={{ height: "100%" }}>
            <YMapComponentsProvider apiKey={import.meta.env.VITE_MAP_API_KEY as string}>
                <YMap location={location}>
                    <YMapDefaultSchemeLayer theme="dark" />
                    <YMapDefaultFeaturesLayer  
                    />
                    <YMapListener
                        layer='any'
                        onClick={clickHandler}
                    />
                    <YMapControls position={"right"}>
                        <YMapZoomControl>

                        </YMapZoomControl>
                    </YMapControls>

                    {mapStore.markers.map(marker => {
                        return <YMapDefaultMarker coordinates={marker.coordinates}></YMapDefaultMarker>
                    })}

                    {mapStore.formIsOpened ?
                        <YMapDefaultMarker coordinates={location.center as LngLat}></YMapDefaultMarker>
                        :
                        null
                    }

                    {mapStore.formIsOpened ?
                        
                        <Popover
                            content={
                                <MarkerForm />
                            }
                            open={true}
                        >
                            <div></div>
                        </Popover>
                        :
                        null
                    }

                </YMap>
            </YMapComponentsProvider>
        </div>
        
        
    )
})

export default MapComponent