import { Button, Form } from "antd"
import Input from "antd/es/input/Input"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../services/MapHub"
import MarkerCreateDTO from "../../../models/Marker/MarkerCreateDTO"

export const MarkerForm = observer(() => {

    const { mapStore, userStore } = useStores()
    const { connection } = MapHub()

    const Finish = (values: MarkerCreateDTO) => {

        values.username = userStore.User.username

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
                <Form.Item<MarkerCreateDTO>
                    label="username"
                    name="username"
                >
                    <Input disabled defaultValue={userStore.User.username}></Input>
                </Form.Item>

                <Form.Item<MarkerCreateDTO>
                    label="title"
                    name="title"
                >
                    <Input />
                </Form.Item>

                <Form.Item<MarkerCreateDTO>
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