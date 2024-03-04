//import { useState } from "react";
import { DomEvent, DomEventHandlerObject, LngLat } from "@yandex/ymaps3-types"
import { YMap, YMapComponentsProvider, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener } from "ymap3-components"

interface Props {
    updateProps: (event: DomEvent) => void
}


const MapComponent = (props: Props) => {

    //const [markers, setMarker] = useState<LngLat[]>([])

    function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        props.updateProps(event)
        console.log(event.coordinates)
    }

    //const [isLoading, setIsLoading] = useState(true);

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

                    {/*{markers.map(marker => {*/}
                    {/*    return <YMapDefaultMarker coordinates={marker} title="Rew"></YMapDefaultMarker>*/}
                    {/*})}*/}
                    
                </YMap>
            </YMapComponentsProvider>
        </div>
        
        
    )
}

export default MapComponent