import { DomEvent, DomEventHandler, DomEventHandlerObject, LngLat } from "@yandex/ymaps3-types";
import { Spin } from "antd"
import { useState } from "react";
import { YMap, YMapComponentsProvider, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener } from "ymap3-components"

const MapComponent = () => {

    const [markers, setMarker] = useState<LngLat[]>([])

    function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        setMarker(oldMarkers => [...oldMarkers, event.coordinates])
    }

    const [isLoading, setIsLoading] = useState(true);

    return (
        
        <>
            <YMapComponentsProvider apiKey={import.meta.env.VITE_MAP_API_KEY as string}
                onLoad={() => setIsLoading(false)}
            >
                <YMap location={{ zoom: 5}}
                >
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer />
                    <YMapListener
                        layer='any'
                        onClick={clickHandler}
                    />

                    {markers.map(marker => {
                        return <YMapDefaultMarker coordinates={marker} title="Rew"></YMapDefaultMarker>
                    })}

                    <YMapDefaultMarker coordinates={[-60.3, -10.5]} title="Rew"></YMapDefaultMarker>
                </YMap>
            </YMapComponentsProvider>
        </>
        
        
    )
}

export default MapComponent