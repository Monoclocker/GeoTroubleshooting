import { Form, Input, Button, notification } from "antd"
import { useAPI } from "../services/useAPI"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
export default function RegisterForm(){

    const { fetchTrigger } = useAPI("User/register")
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    async function OnFinished(values: UserRegistrationDTO) {

        setLoading(true)

        const { StatusCode, Body } = await fetchTrigger("POST", values)

        if (StatusCode != 200) {

            const error: ErrorResponce = Body as ErrorResponce

            api.error({
                message: error.description,
                placement: 'top'
            })

        }

        else {
            navigate("/")
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
                <Form.Item<UserRegistrationDTO>
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
                        },
                        {
                            max: 50,
                            message: "Login must be less then 50 characters"
                        }
                    ]}
                >
                    <Input showCount placeholder="Login" maxLength={50} />
                </Form.Item>

                <Form.Item<UserRegistrationDTO>
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

                <Form.Item<UserRegistrationDTO>
                    label="Email"
                    name="Email"
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
                    <Link to="/register">
                        <Button type="primary">
                            Перейти к авторизации
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
            
        </>
    )

}