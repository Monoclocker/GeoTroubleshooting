import React, { useEffect, useState } from "react"
import { Button, Cascader, CascaderProps, Checkbox, DatePicker, Input } from "antd"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../hooks/RootContext"
import { DomEvent, LngLat } from "@yandex/ymaps3-types"
import Modal from "antd/es/modal/Modal"
import MapHub from "../services/MapHub"
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO"
import MarkersService from "../services/MarkersService"
import UtilsService from "../../../utils/UtilsService"

interface Option {
    value: number | number[]
    label: string
    children?: Option[]
}

interface Props {
    isOpened: boolean, setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterComponent = observer((props: Props) => {

    const { RangePicker } = DatePicker
    const [options, setOptions] = useState<Option[]>([])
    const { GetPlaces } = UtilsService
    const { GetMarkers } = MarkersService
    const { connection } = MapHub()
    const { mapStore } = useStores()
    const [currentFilter, setCurrentFilter] = useState({ ...mapStore.Filter })

    useEffect(() => {

        const fetcher = async () => {

            const locations = await GetPlaces()

            if (locations !== null) {

                const _options: Option[] = []

                locations.forEach((type) => {
                    if (type.places.length !== 0) {
                        const option: Option = {
                            label: type.name,
                            value: type.id
                        }

                        option.children = []

                        type.places.forEach((place) => {

                            option.children?.push(
                                {
                                    label: place.name,
                                    value: [place.coordinates[0], place.coordinates[1], place.id]
                                }
                            )
                        })

                        _options.push(option)
                    }
                    
                })
                setOptions(_options)
            }
        }

        fetcher()
    }, [])

    const onChange: CascaderProps<Option>['onChange'] = async(value) => {

        const valueFormated = value[1] as number[]

        setCurrentFilter({ ...currentFilter, placeId: valueFormated[2], currentPlaceValue: value })
        
        await mapStore.updateLocation({ ...mapStore.CurrrentLocation, center: valueFormated.slice(0, 2) as LngLat })

    }

    const onMarkIdChange = (event) => {
        setCurrentFilter({ ...currentFilter, markId: event.target.value })
    }

    const onTimeChange = (value, dateString: [string, string]) => {
        currentFilter.startTimeStamp = new Date(dateString[0])
        currentFilter.endTimeStamp = new Date(dateString[1])
    }

    const handleSave = async () => {

        if (currentFilter.placeId == undefined) {
            return
        }

        currentFilter.isReady = true
        await mapStore.SetFilter(currentFilter)

        console.log(currentFilter)
        if (currentFilter.isRealTime) {
            await mapStore.getMarkers([])
            connection.on("NewMarker", async (newMarker: MarkerInfoDTO) => {
                if (newMarker.placeId === mapStore.Filter.placeId) {
                    await mapStore.addMarker(newMarker)
                }
            })
        }

        else {

            if (currentFilter.startTimeStamp == undefined || currentFilter.endTimeStamp == undefined) {
                return
            }

            connection.off("NewMarker")
            const data = await GetMarkers({
                startTimeStamp: new Date(currentFilter.startTimeStamp).getTime()/1000,
                endTimeStamp: new Date(currentFilter.endTimeStamp).getTime()/1000,
                placeId: currentFilter.placeId,
                markerId: currentFilter.markId
            })

            await mapStore.getMarkers(data)

        }
        
        props.setIsOpened(false)
    }


    return (
        <Modal open={props.isOpened} onCancel={() => props.setIsOpened(false)} destroyOnClose={true} footer={[
            <Button onClick={() => props.setIsOpened(false)}>Отменить</Button>,
            <Button onClick={() => handleSave()}>Подтвердить</Button>
        ]}>
            <Cascader placeholder="Место" defaultValue={currentFilter.currentPlaceValue} options={options} onChange={onChange} />
            <Input disabled={currentFilter.isRealTime} placeholder="Поиск по метке" value={currentFilter.markId} onChange={onMarkIdChange}></Input>
            <RangePicker
                onChange={onTimeChange}
                disabled={currentFilter.isRealTime}
                showTime={{
                    hideDisabledOptions: true,
                }}
                format="YYYY-MM-DD HH:mm:ss"
            />
            <Checkbox defaultChecked={currentFilter.isRealTime} onChange={(event) => setCurrentFilter({ ...currentFilter, isRealTime: event.target.checked })}>Получать в реальном времени</Checkbox>
        </Modal>
    )
})

export default FilterComponent