import { Form } from "antd"
import { IMarkerInfo } from "../vite-env"
import Input from "antd/es/input/Input"
import { LngLat } from "@yandex/ymaps3-types"
import { useState } from "react"

interface Props {
    coordinates: LngLat,
    username: string
}

export const MarkerForm = (props: Props) => {

    const [values] = useState<Props>(props)

    console.log(values)

    const Finish = (values: IMarkerInfo) => {
        console.log(values)
    }

    return (
        <>
            <Form onFinish={Finish}>
                <Form.Item<IMarkerInfo>
                    label="username"
                    name="username"
                >
                    <Input disabled defaultValue={values.username}></Input>
                </Form.Item>

                <Form.Item<IMarkerInfo>
                    label="x"
                    name={["coordinates", 0]}
                >
                    <Input disabled defaultValue={values.coordinates[0]} />
                </Form.Item>

                <Form.Item<IMarkerInfo>
                    label="y"
                    name={["coordinates", 1]}
                >
                    <Input disabled defaultValue={values.coordinates[1]} />
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

            </Form>
        </>
    )
}