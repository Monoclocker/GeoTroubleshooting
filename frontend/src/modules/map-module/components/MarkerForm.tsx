import { GetProp, Button, Form, Upload, UploadProps, type UploadFile } from "antd"
import Input from "antd/es/input/Input"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../services/MapHub"
import MarkerCreateDTO from "../../../models/Marker/MarkerCreateDTO"
import { useState } from "react"
import UtilsService from "../../../utils/UtilsService"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const MarkerForm = observer(() => {

    const { mapStore, userStore } = useStores()
    const { connection } = MapHub()
    const { UploadFiles } = UtilsService
    const [formFiles, setFormFiles] = useState<UploadFile[]>([])
    const [tags, setTags] = useState([])

    const Finish = async (values: MarkerCreateDTO) => {

        const location = { ...mapStore.getLocation() }

        values.username = userStore.User.username
        values.placeId = location.placeId

        if (values.username === undefined || values.placeId === 0) {
            return
        }

        const obj = location.center
        
        values.coordinates = [obj[0],obj[1]]

        values.attachments = []

        const formData = new FormData()

        formFiles.forEach((file) => {
            formData.append("files", file)
        })

        const result = await UploadFiles(formData)

        if (result === false) {
            return
        }


        formFiles.forEach((file) => {
            values.attachments.push({
                Path: file.name,
                Type: file.type!
            })
        })

        console.log(values)

        connection.invoke("AddMarker", { ...values })
            .catch((error) => {
                console.log(error)
            })
    }

    const props: UploadProps = {
        listType:"picture-card",
        onRemove: (file) => {
            const index = formFiles.indexOf(file);
            const newFileList = formFiles.slice();
            newFileList.splice(index, 1);
            setFormFiles(newFileList);
        },
        beforeUpload: (file) => {
            setFormFiles([...formFiles,file]);
            return false;
        },
        formFiles,
    }

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            <Form
                onFinish={Finish}
            >

                <Form.Item<MarkerCreateDTO>
                    label="Название"
                    name="name"
                    rules={[{
                        required: true,
                        message: "Поле обязательно"
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<MarkerCreateDTO>
                    label="Описание"
                    name="description"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Upload {...props} onPreview={onPreview}>
                        {formFiles.length < 3 ? "Загрузить" : null}
                    </Upload>
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