import { Button, DatePicker, Form } from "antd";
import { observer } from "mobx-react-lite";
import MarkersGetDTO from "../../../models/Marker/MarkerGetDTO";
import { useState } from "react";
import dayjs from 'dayjs'
import MapHub from "../services/MapHub";
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO";
import { useStores } from "../../../hooks/RootContext";
import MarkersService from "../services/MarkersService";

export const TimeSelector = observer(() => {

    const { connection } = MapHub()
    const { GetMarkers } = MarkersService
    const {mapStore } = useStores()
    const [hided, setIsHide] = useState(false)

    const onFinish = async(value: MarkersGetDTO) => {

        try {
            connection.off("NewMarker")
        }
        catch(ex) { console.log(ex) }

        value.placeId = mapStore.getLocation().placeId

        const markers = await GetMarkers(value)

        mapStore.getMarkers(markers)

    }

    const onClick = () => {
        connection.on("NewMarker", (marker: MarkerInfoDTO) => {
            mapStore.addMarker(marker)
        })
    }

    const Hide = () => {
        setIsHide(!hided)
    }


    return (
        <>
            {!hided ? 
                <Form
                    onFinish={onFinish}
                >
                    <Form.Item<MarkersGetDTO>
                        name={"startTimeStamp"}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                    <Form.Item<MarkersGetDTO>
                        name={"endTimeStamp"}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">Получить метки</Button>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={onClick}>Получать в режиме реального времени</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={Hide}>Скрыть</Button>
                    </Form.Item>
                </Form>
                :
                <Button onClick={ Hide}>Показать</Button>

            }

            
        </>
    )
})