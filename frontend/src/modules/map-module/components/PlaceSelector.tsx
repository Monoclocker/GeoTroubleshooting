import { useEffect, useState } from "react"
import { useStores } from "../../../hooks/RootContext"
import {Cascader, type CascaderProps } from "antd"
import PlacesService from "../services/PlacesService"
import { observer } from "mobx-react-lite"
import { LngLat } from "@yandex/ymaps3-types"

interface Option {
    value: number | { coordinates: number[], placeId: number }
    label: string
    children?: Option[]
}

interface Props {
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceSelector = observer((props: Props) => {

    const [options, setOptions] = useState<Option[]>([])

    const { GetPlaces } = PlacesService
    const { mapStore } = useStores()


    useEffect(() => {

        const fetcher = async () => {
            const locations = await GetPlaces()

            if (locations !== null) {

                const _options: Option[] = []

                locations.forEach((type) => {
                    const option: Option = {
                        label: type.name,
                        value: type.id
                    }

                    option.children = []

                    type.places.forEach((place) => {
                        option.children?.push(
                            {
                                label: place.name,
                                value: { coordinates: place.coordinates, placeId: place.id }
                            }
                        )
                    })

                    _options.push(option)
                })
                setOptions(_options)
            }
        }

        fetcher()
    },[])

    const onChange: CascaderProps<Option>['onChange'] = (value) => {

        const valueFormated = value[1] as { coordinates: number[], placeId: number }

        props.setActive(true)

        mapStore.updateLocation({ ...mapStore.getLocation(), placeId: valueFormated.placeId, center: valueFormated.coordinates as LngLat })
    }

    return (
        <Cascader options={options} onChange={onChange} />
    )
})

export default PlaceSelector