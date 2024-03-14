//import { useState } from "react";
import { DomEvent, DomEventHandlerObject} from "@yandex/ymaps3-types"
import { observer } from "mobx-react-lite"
import { YMap, YMapComponentsProvider, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener } from "ymap3-components"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../services/MapHub"
import { IMarkerInfo } from "../../../vite-env"
import { useEffect } from "react"


const MapComponent = observer(() => {

    const { mapStore } = useStores()
    const { connection } = MapHub()

    function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        mapStore.setFormData(event.coordinates)
        mapStore.showForm(true)
    }

    useEffect(() => {

        connection.invoke("GetMarkers").catch((err) => console.log(err))

        connection.on("InitMarkers", (markers: IMarkerInfo[]) => {
            mapStore.getMarkers(markers)
        })

        connection.on("NewMarker", (marker: IMarkerInfo) => {
            mapStore.addMarker(marker)
        })

        return () => { }

    }, [])
    

    

    return (

        <div style={{ width: '500px', height:'500px' }}>
            <YMapComponentsProvider apiKey={import.meta.env.VITE_MAP_API_KEY as string}>
                <YMap location={{ center: [40, 13], zoom: 2 }}
                >
                    <YMapDefaultSchemeLayer theme="dark" />
                    <YMapDefaultFeaturesLayer />
                    <YMapListener
                        layer='any'
                        onClick={clickHandler}
                    />

                    {mapStore.markers.map(marker => {
                        return <YMapDefaultMarker coordinates={marker.coordinates}></YMapDefaultMarker>
                    })}

                    {mapStore.formIsOpened ?
                        <YMapDefaultMarker coordinates={mapStore.Marker!}></YMapDefaultMarker>
                        :
                        null
                    }

                </YMap>
            </YMapComponentsProvider>
        </div>
        
        
    )
})

export default MapComponent