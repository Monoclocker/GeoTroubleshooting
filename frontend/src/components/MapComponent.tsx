import { YMap, YMapComponentsProvider, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer } from "ymap3-components"
import { useStores } from "./RootContext"
import { AuthService } from "../services/AuthService"
import { useEffect } from "react"
 
const MapComponent = () => {

    useEffect(() => {
        async () => {
            GetApiKey()
            console.log(keyStore.mapsKey)
        }
    })

    return (
        <YMapComponentsProvider apiKey={//придумать как сюда подставлять ключ} >
            <YMap location={{ center: [48.43, 133.23], zoom: 5 }}> 
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapDefaultMarker coordinates={[-60.3, -10.5]} title="Rew"></YMapDefaultMarker>
            </YMap>
        </YMapComponentsProvider>
    )
}

export default MapComponent