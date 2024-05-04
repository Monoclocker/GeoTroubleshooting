import { Form, Input, Button, notification, Spin } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useStores } from "../../../hooks/RootContext"
import UserLoginDTO from "../../../models/Auth/UserLoginDTO"

export default function LoginForm() {

    const { authStore } = useStores()
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()
    const [fullscreenLoading, setfsLoading] = useState(false)
    function OnFinished(values: UserLoginDTO) {

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

        setfsLoading(true)

        if (authStore.checkAuth()) {

            setfsLoading(false)

            navigate('/dashboard/profile')
        }

        setfsLoading(false)

    }, [])


    if (fullscreenLoading) {
        return <Spin spinning={true} fullscreen/>
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
                    label="Имя пользователя"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Поле является обязательным"
                        }
                    ]}
                >
                    <Input showCount placeholder="Имя пользователя" maxLength={50} />
                </Form.Item>

                <Form.Item<UserLoginDTO>
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Поле является обязательным"
                        }
                    ]}
                >
                    <Input.Password placeholder="Пароль" />
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