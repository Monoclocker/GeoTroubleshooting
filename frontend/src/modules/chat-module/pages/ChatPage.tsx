import { useParams } from "react-router-dom"
import Settings from "../components/Settings"
import { Tabs, TabsProps } from "antd";

const ChatPage = () => {

    const { id } = useParams()

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Сообщения',
            children: null,
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
}

export { ChatPage }