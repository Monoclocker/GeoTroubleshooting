import { DomEvent, DomEventHandlerObject, LngLat} from "@yandex/ymaps3-types"
import { observer } from "mobx-react-lite"
import { YMap, YMapComponentsProvider, YMapControlButton, YMapControls, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapListener, YMapZoomControl } from "ymap3-components"
import { useStores } from "../../../hooks/RootContext"
import { Button, Popover } from "antd"
import { MarkerForm } from "./MarkerForm"
import { useEffect, useState } from "react"
import FilterComponent from "./FilterComponent"
import { useNavigate } from "react-router"
import MarkerModal from "./MarkerModal"
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO"

const MapComponent = observer(() => {

    const { mapStore, authStore } = useStores()
    const [modalIsOpened, openModal] = useState(false)
    const navigate = useNavigate()
    const [formIsOpened, openForm] = useState(false)
    const [infoIsOpened, openInfo] = useState(false)
    const [clickedMarker, setMarker] = useState({} as MarkerInfoDTO)

    async function clickHandler(object: DomEventHandlerObject, event: DomEvent) {
        console.log(event)
        await mapStore.updateLocation({ ...mapStore.CurrrentLocation, center: [event.coordinates[0], event.coordinates[1]] })
        openForm(true)
    }

    useEffect(() => {
        if (!authStore.checkAuth()) {
            navigate("/login")
            return
        }
    }, [])

    return (
        <>

            <div style={{ height: "100%"}}>
                
                <YMapComponentsProvider apiKey={import.meta.env.VITE_MAP_API_KEY as string}>

                    <YMap location={mapStore.CurrrentLocation}>
                        
                        <YMapDefaultSchemeLayer theme="dark" />
                        <YMapDefaultFeaturesLayer
                        />
                        <YMapListener
                            onUpdate={(event) => mapStore.updateLocation({ center: event.location.center, zoom: event.location.zoom })}
                            layer='any'
                            onContextMenu={clickHandler}
                        />

                        <YMapControls position={"left top"}>
                            <YMapControlButton>
                                <Button onClick={() => openModal(true)}>Фильтры</Button>
                            </YMapControlButton>
                        </YMapControls>

                        
                        <YMapControls position={"right top"}>
                            <YMapControlButton>
                                <Popover title="Помощь" content={<div>
                                    <p>Просмотреть метку - нажатие левой кнопкой мыши</p>
                                    <p>Создать метку - нажатие правой кнопкой мыши</p>
                                </div>}>
                                    Помощь
                                </Popover>
                            </YMapControlButton>
                        </YMapControls>

                        {infoIsOpened ?
                            <MarkerModal setOpen={openInfo} marker={clickedMarker} />
                            :
                            null
                        }

                        <YMapControls position={"right"}>
                            <YMapZoomControl>
                            </YMapZoomControl>
                        </YMapControls>

                        <FilterComponent isOpened={modalIsOpened} setIsOpened={openModal} />
                        

                        {mapStore.markers.map(marker => {
                            return <>
                                <YMapDefaultMarker onClick={() => { setMarker(marker); openInfo(true) }} coordinates={marker.coordinates as LngLat}></YMapDefaultMarker>
                            </>
                        })}

                        {formIsOpened && mapStore.Filter.isReady ?
                            <>
                                <YMapDefaultMarker coordinates={mapStore.CurrrentLocation.center as LngLat}></YMapDefaultMarker>
                                <YMapControls position={"left bottom"}>
                                    <YMapControlButton>
                                        <MarkerForm openForm={openForm} />
                                    </YMapControlButton>
                                </YMapControls>
                            </> 
                            :
                            null
                        }

                        {mapStore.Filter.isReady ? 
                            <YMapControls position={"bottom"}>
                                <YMapControlButton>
                                    <Button onClick={() => navigate("/dashboard/chat")}>Перейти к чату</Button>
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