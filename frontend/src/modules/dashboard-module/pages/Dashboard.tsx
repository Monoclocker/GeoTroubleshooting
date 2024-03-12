import Sider from "antd/es/layout/Sider"
import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Layout, {Content} from "antd/es/layout/layout"
import { useState } from "react"


function DashboardPage() {

    const [isCollapsed, setCollapsed] = useState(true)

    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <div className="demo-logo-vertical" />
                <Sider collapsible collapsed={isCollapsed} onCollapse={(event) => setCollapsed(event)}>
                    <Navbar />
                </Sider>
                <Layout>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            
            
            
        </>
    )
}

export { DashboardPage }