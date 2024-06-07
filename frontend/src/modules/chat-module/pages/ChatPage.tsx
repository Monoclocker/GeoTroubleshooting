import { useNavigate, useParams } from "react-router-dom"
import Settings from "../components/Settings"
import { Button, Tabs, TabsProps } from "antd";
import { useEffect } from "react";
import { useStores } from "../../../hooks/RootContext";
import ChatHub from "../services/ChatHub";
import MessageDTO from "../../../models/Message/MessageDTO";
import Chat from "../components/Chat";
import { observer } from "mobx-react-lite";

const ChatPage = observer(() => {

    const { id } = useParams()
    const { chatStore, userStore } = useStores()
    const { connection } = ChatHub()
    const navigate = useNavigate()


    useEffect(() => {

        if (!userStore.User.username) {
            navigate("/dashboard/profile")
            return
        }

        connection.on("SuccessRegistration", async (messages: MessageDTO[]) => {
            await chatStore.setMessages(messages);
        })

        connection.on("NewMessage", async (message) => {
            if (message === null) {
                
                alert("Чат удалён или вы в нём больше не состоите")
                connection.off("NewMessage")
                navigate('/dashboard/chat')
                return
            }
            await chatStore.addMessage(message);
            return
        })

        connection.invoke("RegisterToChat", Number(id))
            .catch((error) => console.log(error))

        return () => {
            connection.off("SuccessRegistration");
            connection.off("NewMessage");
        };
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
        <Button onClick={() => { connection.invoke("UnregisterFromChat", Number(id)); navigate("/dashboard/chat"); return }}>Назад</Button>
        <Tabs defaultActiveKey="1" items={items} />
    </>
})

export { ChatPage }