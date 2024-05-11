import { Menu, NotificationArgsProps, notification } from "antd"
import { useNavigate } from "react-router"
import { ProfileFilled, HeatMapOutlined, MessageOutlined, LogoutOutlined } from "@ant-design/icons"
import { useStores } from "../../../hooks/RootContext"
import MapHub from "../../map-module/services/MapHub"
import { NotificationPlacement } from "antd/es/notification/interface"
import { Context } from "@yandex/ymaps3-types/imperative/Entities"
import { useEffect } from "react"

const Navbar = () => {

    const navigate = useNavigate()
    const { connection } = MapHub()
    const [api, contextHolder] = notification.useNotification()
    const { authStore } = useStores()

    function logout() {
        authStore.logout()
        navigate("/")
    }

    useEffect(() => {
        connection.on("Warning", () => {
            openNotification
        })
    }, [])

    const openNotification = () => {
        api.warning({
            message: 'Warning',
            placement: "bottomRight"
        })
    }


    return (
        <>
            {contextHolder}
            <Menu

                mode="inline"
                theme="dark"
                items={[
                    {
                        key: "1", icon: <ProfileFilled />, label: "Профиль", onClick: () => { navigate("profile") }
                    },
                    {
                        key: "2", icon: <HeatMapOutlined />, label: "Карта", onClick: () => { navigate("map") }
                    },
                    {
                        key: "3", icon: <MessageOutlined />, label: "Чат", onClick: () => { navigate("chat") }
                    },
                    {
                        key: "4", icon: <LogoutOutlined />, label: "Выйти", onClick: () => { logout() }
                    }
                ]} />
        </>
        
             
    )
}

export default Navbar