import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import RegisterForm from "../components/RegisterForm"

export default function Registration() {
    return (
        <Layout>
            <Content
                style={
                    {
                        minHeight: '100vh'
                    }
                }>
                <RegisterForm />
            </Content>
        </Layout>
    )
}