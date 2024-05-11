//import { useState } from "react";
import { DomEvent, DomEventHandlerObject, LngLat} from "@yandex/ymaps3-types"
import { observer } from "mobx-react-lite"
import { YMap, YMapComponentsProvider, YMapControlButton, YMapControls, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener, YMapZoomControl } from "ymap3-components"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../services/MapHub"
import { useEffect, useState } from "react"
import { } from "antd"
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO"
import { MarkerForm } from "./MarkerForm"
import PlacesService from "../services/PlacesService"
import PlaceSelector  from "./PlaceSelector"
import { TimeSelector } from "./TimeSelector"

const MapComponent = observer(() => {

    const { mapStore } = useStores()

    const [isPlaceSet, setIsPlaceSet] = useState(false)

    function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        mapStore.updateLocation({ ...mapStore.getLocation(), center: [event.coordinates[0], event.coordinates[1]] })
        mapStore.setFormData(event.coordinates)
        mapStore.showForm(true)
    }

    return (
        <>

            <div style={{ height: "100%"}}>
                
                <YMapComponentsProvider apiKey={import.meta.env.VITE_MAP_API_KEY as string}>

                    <YMap location={mapStore.getLocation()}>
                        
                        <YMapDefaultSchemeLayer theme="dark" />
                        <YMapDefaultFeaturesLayer
                        />
                        <YMapListener
                            layer='any'
                            onClick={clickHandler}
                        />

                        <YMapControls position={"left top"}>
                            <YMapControlButton>
                                <PlaceSelector setActive={setIsPlaceSet}></PlaceSelector>
                            </YMapControlButton>
                        </YMapControls>

                        <YMapControls position={"right"}>
                            <YMapZoomControl>

                            </YMapZoomControl>
                        </YMapControls>

                        

                        {mapStore.markers.map(marker => {
                            return <YMapDefaultMarker coordinates={marker.coordinates as LngLat}></YMapDefaultMarker>
                        })}

                        {mapStore.formIsOpened ?
                            <YMapDefaultMarker coordinates={mapStore.getLocation().center as LngLat}></YMapDefaultMarker>
                            :
                            null
                        }

                        {isPlaceSet ?
                            <YMapControls position={"top"}>
                                <YMapControlButton>
                                    <TimeSelector/>
                                </YMapControlButton>
                            </YMapControls>
                            :
                            null
                        }

                        {mapStore.formIsOpened ?
                            <YMapControls position={"left bottom"}>
                                <YMapControlButton>
                                    <MarkerForm />
                                </YMapControlButton>
                            </YMapControls>
                            :
                            null
                        }

                    </YMap>
                </YMapComponentsProvider>
            </div>
        </>
        

        
        
        
    )
})

export default MapComponent