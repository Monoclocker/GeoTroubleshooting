import { Form, Input, Button, notification } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useStores } from "../../../hooks/RootContext"
import { IUser } from "../../../vite-env"

export default function RegisterForm(){

    const { authStore } = useStores()

    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    function OnFinished(values: IUser) {

        setLoading(true)

        authStore.Register(values)
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                api.error({
                    message: error.message,
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
    },[])

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
                        },
                        {
                            min: 8,
                            message: "Login must be at least 8 characters"
                        },
                        {
                            max: 50,
                            message: "Login must be less then 50 characters"
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

                <Form.Item<IUser>
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "EMail is required"
                        },
                        {
                            type: "email",
                            message: "Not valid EMail"
                        }
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>Зарегистрироваться</Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/">
                        <Button type="primary">
                            Перейти к авторизации
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
            
        </>
    )

}