import { Button, Input, Upload, UploadFile, UploadProps, Image} from "antd";
import { useStores } from "../../../hooks/RootContext";
import ChatHub from "../services/ChatHub";
import MessageDTO from "../../../models/Message/MessageDTO";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import UtilsService from "../../../utils/UtilsService";
import Card from "antd/es/card/Card";
import { IMAGE_ADDRESS } from "../../../utils/APIConstants";

interface Props {
    id: number
}

const Chat = observer((props: Props) => {

    const { userStore, chatStore } = useStores()
    const { connection } = ChatHub()
    const [message, setMessage] = useState<string>("")
    const { UploadFiles } = UtilsService
    const [formFiles, setFormFiles] = useState<UploadFile[]>([])

    const onChange = (event) => {
        setMessage(event.target.value)
    }

    const uploadProps: UploadProps = {
        listType: "picture-card",
        onRemove: (file) => {
            const index = formFiles.indexOf(file);
            const newFileList = formFiles.slice();
            newFileList.splice(index, 1);
            setFormFiles(newFileList);
        },
        beforeUpload: (file) => {
            setFormFiles([...formFiles, file]);
            return false;
        },
        formFiles,
    }

    const clickHandler = async() => {

        const newMessage: MessageDTO = {
            message: message,
            username: userStore.User.username,
            groupId: Number(props.id),
            
        } 

        const formData = new FormData()

        formFiles.forEach((file) => {
            if (file.type == "") {
                return
            }
            console.log(file.type)

            formData.append("files", file)
        })

        const result = await UploadFiles(formData)

        if (result === false) {
            return
        }

        newMessage.attachments = []

        formFiles.forEach((file) => {

            newMessage.attachments!.push({
                path: file.name,
                type: file.type!
            })
        })

        connection.invoke("CreateMessage", newMessage)
            .catch((error) => {console.log(error); return })

    }

    return <>
        <Input.TextArea autoSize={ true} style={{ width: "90%" }} showCount onChange={onChange} />
        <Button onClick={() => clickHandler()}>Отправить</Button>
        <Upload {...uploadProps}>
            {formFiles.length < 15 ? "Загрузить" : null}
        </Upload>

        {chatStore.Messages.length > 0 ? chatStore.Messages.map((message) => {
            return <>
                <Card title={message.username}>
                    <p>{message.timestamp?.toString()}</p>
                    <p>{message.message}</p>
                    {message.attachments ? message.attachments!.map((attachment) => {

                        if (!attachment.type.includes("image")) {
                            return null
                        }

                        return <Image width={150} src={IMAGE_ADDRESS + attachment.path}/>
                    }) : null}
                    {message.attachments ? message.attachments!.map((attachment) => {

                        if (attachment.type.includes("image")) {
                            return
                        }

                        return <a type='button' href={IMAGE_ADDRESS + attachment.path}>{attachment.path}</a>
                    }): null}

                </Card>
            </>
        }) : null}

    </>
})

export default Chat