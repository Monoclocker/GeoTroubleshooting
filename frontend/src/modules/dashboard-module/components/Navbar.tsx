import { Menu } from "antd"
import { useNavigate } from "react-router"
import { ProfileFilled, HeatMapOutlined } from "@ant-design/icons"

const Navbar = () => {

    const navigate = useNavigate()

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
            }
        ]} />
             
    )
}

export default Navbar