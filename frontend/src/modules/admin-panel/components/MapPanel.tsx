import { DomEvent, DomEventHandlerObject, LngLat} from "@yandex/ymaps3-types"
import { Button, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { observer } from "mobx-react-lite"
import { SetStateAction, useState } from "react"
import { YMap, YMapComponentsProvider, YMapControlButton, YMapControls, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener, YMapZoomControl } from "ymap3-components"
import PlacesService from "../services/PlacesService"
import PlaceDTO from "../../../models/Places/PlaceDTO"

interface PlaceDataType {
    key: number;
    name: string
    coordinates: string
    type: string,
    typeId: number
}

interface Props {
    name: string
    types: DefaultOptionType[]
    places: PlaceDataType[]
    updatePlaces: React.Dispatch<SetStateAction<PlaceDataType[]>>
    openModal: React.Dispatch<SetStateAction<boolean>>
}

const MapPanel = observer((props: Props) => {
    const { AddPlace } = PlacesService
    const [location, setLocation] = useState({ center: [0, 0] as LngLat, zoom: 5 })
    const [markerLocation, updateLocation] = useState<LngLat | undefined>(undefined)
    const [showMarker, setShowMarker] = useState(false)
    const [typeId, setTypeId] = useState(1)

    async function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        setShowMarker(true)
        updateLocation(event.coordinates as LngLat)
    }

    async function addPlace() {

        if (markerLocation === undefined) {
            return
        }

        const result = await AddPlace({ coordinates: markerLocation as number[], name: props.name } as PlaceDTO, typeId)

        if (result !== null) {

           
            const newPlace: PlaceDataType = {
                key: result.id, coordinates: result.coordinates[0] + " " + result.coordinates[1],
                type: props.types.filter(x => x.value == typeId)[0].label!.toString(), name: result.name, typeId: typeId
            }


            props.updatePlaces([...props.places, newPlace])
            props.openModal(false)
        }

        else {
            props.openModal(false)
        }

    }

    return (
        <>
            <YMapComponentsProvider apiKey={import.meta.env.VITE_MAP_API_KEY as string}>

                <YMap location={location}>

                    <YMapDefaultSchemeLayer theme="dark" />
                    <YMapDefaultFeaturesLayer
                    />
                    <YMapListener
                        onUpdate={(event) => setLocation({ center: event.location.center, zoom: event.location.zoom })}
                        layer='any'
                        onClick={clickHandler}
                    />

                    {showMarker ?
                        <YMapDefaultMarker coordinates={markerLocation!}></YMapDefaultMarker>
                        :
                        null
                    }

                    <YMapControls position={"left top"}>
                        <YMapControlButton>
                            <Select style={{ width: 120 }} options={props.types} onChange={(value) => setTypeId(value)} />
                            <Button onClick={() => addPlace()}>Добавить</Button>
                        </YMapControlButton>
                    </YMapControls>
                </YMap>
            </YMapComponentsProvider>
        </>
        

        
        
        
    )
})

export default MapPanel