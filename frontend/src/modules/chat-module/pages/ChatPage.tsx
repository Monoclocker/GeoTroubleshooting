import { useParams } from "react-router-dom"
import Settings from "../components/Settings"
import { Tabs, TabsProps } from "antd";
import { useEffect } from "react";
import { useStores } from "../../../hooks/RootContext";
import ChatHub from "../services/ChatHub";
import MessageDTO from "../../../models/Message/MessageDTO";
import Chat from "../components/Chat";
import { observer } from "mobx-react-lite";

const ChatPage = observer(() => {

    const { id } = useParams()
    const { chatStore } = useStores()
    const { connection } = ChatHub()

    useEffect(() => {
        connection.on("SuccessRegistration", async (messages: MessageDTO[]) => {
            console.log(messages)
            await chatStore.setMessages(messages);
        })

        connection.on("NewMessage", async (message) => {
            await chatStore.addMessage(message);
        })

        connection.invoke("RegisterToChat", Number(id))
            .catch((error) => console.log(error))

    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Сообщения',
            children: <Chat id={Number(id)} />,
        },
        {
            key: '2',
            label: 'Настройки',
            children: <Settings id={Number(id!)} />,
        }
    ];

    return <>
        <Tabs defaultActiveKey="1" items={items} />
    </>
})

export { ChatPage }