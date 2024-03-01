import dotenv from "dotenv"
import { YMap, YMapComponentsProvider, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer } from "ymap3-components"

dotenv.config()

const MapComponent = () => {

    console.log(process.env.REACT_APP_API_KEY)

    return (
        <YMapComponentsProvider apiKey={process.env.REACT_APP_API_KEY as string} >
            <YMap location={{ center: [48.43, 133.23], zoom: 5 }}> 
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapDefaultMarker coordinates={[-60.3, -10.5]} title="Rew"></YMapDefaultMarker>
            </YMap>
        </YMapComponentsProvider>
    )
}

export default MapComponent