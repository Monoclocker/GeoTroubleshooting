import { Menu } from "antd"
import { useNavigate } from "react-router"
import { ProfileFilled, HeatMapOutlined, MessageOutlined, LogoutOutlined } from "@ant-design/icons"
import { useStores } from "../../../hooks/RootContext"

const Navbar = () => {

    const navigate = useNavigate()
    const { authStore } = useStores()

    function logout() {
        authStore.logout()
        navigate("/")
    }


    return (
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
             
    )
}

export default Navbar