import { Form, Input, Button, notification } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useStores } from "./RootContext"
import { AuthService } from "../services/AuthService"
export default function LoginForm() {

    const { authStore } = useStores()
    const { Login } = AuthService(authStore)
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    async function OnFinished(values: UserRegistrationDTO) {

        setLoading(true)

        if (!await Login(values)) {
            api.error({
                message: "Пользователя не существует",
                placement: 'top'
            })
        }

        else {
            navigate("/profile")
        }
            
        

        setLoading(false)
    }

    return (
        <>
            {contextHolder}
            <Form
                scrollToFirstError
                onFinish={OnFinished}
                colon={false}
                style={{
                    maxWidth: 800,
                }}
                wrapperCol={{ offset: 5 }}
                labelCol={{ offset: 5 }}
                labelWrap={false}

            >
                <Form.Item<UserLoginDTO>
                    label="Username"
                    name="Username"
                    rules={[
                        {
                            required: true,
                            message: "Login required"
                        },
                        {
                            min: 8,
                            message: "Login must be at least 8 characters"
                        }
                    ]}
                >
                    <Input showCount placeholder="Login" maxLength={50} />
                </Form.Item>

                <Form.Item<UserLoginDTO>
                    label="Password"
                    name="Password"
                    rules={[
                        {
                            min: 8,
                            message: "Password must be at least 8 characters"
                        },
                        {
                            required: true,
                            message: "Password required"
                        },
                        {
                            pattern: /[a-zA-z0-9]*/,
                            message: "Password must contain characters or numbers"
                        }
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>Войти</Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/register">
                        <Button type="primary">
                            Перейти к регистрации
                        </Button>
                    </Link>
                </Form.Item>
            </Form>

        </>
    )

}