import { Form, Input, Button, notification } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { IUser } from "../../../vite-env"
import { useStores } from "../../../hooks/RootContext"

export default function LoginForm() {

    const { authStore } = useStores()
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    function OnFinished(values: IUser) {

        setLoading(true)

        authStore.Login(values)
            .then(() => {
                navigate("/dashboard/profile")
            })
            .catch((error) => {
                api.error({
                    message: (error.message as string),
                    placement: 'top'
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (authStore.checkAuth()) {
            navigate('/dashboard/profile')
        }
    }, [])


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
                <Form.Item<IUser>
                    label="Username"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: "Login required"
                        }
                    ]}
                >
                    <Input showCount placeholder="Login" maxLength={50} />
                </Form.Item>

                <Form.Item<IUser>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password required"
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