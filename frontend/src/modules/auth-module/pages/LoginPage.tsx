import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import LoginForm from "../components/LoginForm"




function LoginPage() {

    return (
        <Layout>
            <Content
                style={
                    {
                        minHeight: '100vh'
                    }
                }>
                <LoginForm />
            </Content>
        </Layout>
    )



}

export { LoginPage }