import { Button, Form } from "antd"
import Input from "antd/es/input/Input"
import { IMarkerInfo } from "../../../vite-env"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../services/MapHub"

export const MarkerForm = observer(() => {

    const { mapStore, userStore } = useStores()
    const { connection } = MapHub()

    const Finish = (values: IMarkerInfo) => {

        values.coordinates = mapStore.Marker
        values.username = userStore.User.userName

        console.log(values)

        connection.invoke("AddMarker", values)
            .then(() => {
                mapStore.addMarker(values)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <>
            <Form
                onFinish={Finish}
            >
                <Form.Item<IMarkerInfo>
                    label="username"
                    name="username"
                >
                    <Input disabled defaultValue={userStore.User.userName}></Input>
                </Form.Item>

                <Form.Item<IMarkerInfo>
                    label="title"
                    name="title"
                >
                    <Input />
                </Form.Item>

                <Form.Item<IMarkerInfo>
                    label="description"
                    name="description"
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary">Сохранить</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => { mapStore.showForm(false) }} type="primary">Закрыть форму</Button>
                </Form.Item>

            </Form>
        </>
    )
})