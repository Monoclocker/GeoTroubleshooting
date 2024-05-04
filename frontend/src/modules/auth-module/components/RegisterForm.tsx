import { Form, Input, Button, notification, DatePicker, Radio } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useStores } from "../../../hooks/RootContext"
import UserRegistrationDTO from "../../../models/Auth/UserRegistrationDTO"
import UtilsService from "../../../utils/UtilsService"
import RolesDTO from "../../../models/General/RolesDTO"

export default function RegisterForm(){

    const { authStore } = useStores()
    const getRoles = UtilsService.GetRoles
    const navigate = useNavigate()
    const [roles, setRoles] = useState<RolesDTO[]>([])
    const [isLoading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    function OnFinished(values: UserRegistrationDTO) {

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

        async function setRole() {
            setRoles(await getRoles())
        }

        if (authStore.checkAuth()) {
            navigate('/dashboard/profile')
        }

        setRole()

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
                <Form.Item<UserRegistrationDTO>
                    label="Имя пользователя"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно"
                        },
                        {
                            min: 8,
                            message: "Минимальная длина - 8 символов"
                        },
                        {
                            max: 50,
                            message: "Максимальная длина - 50 символов"
                        }
                    ]}
                >
                    <Input showCount placeholder="Имя пользователя" maxLength={50} />
                </Form.Item>

                <Form.Item<UserRegistrationDTO>
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            min: 8,
                            message: "Минимальная длина - 8 символов"
                        },
                        {
                            required: true,
                            message: "Поле обязательно"
                        },
                        {
                            pattern: /[a-zA-z0-9]*/,
                            message: "Пароль должен содержать латинницу или цифры"
                        }
                    ]}
                >
                    <Input.Password placeholder="Пароль" />
                </Form.Item>

                <Form.Item<UserRegistrationDTO>
                    label="Электронная почта"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно"
                        },
                        {
                            type: "email",
                            message: "Введённое значение - не электронная почта"
                        }
                    ]}
                >
                    <Input placeholder="Электронная почта" />
                </Form.Item>

                <Form.Item<UserRegistrationDTO>
                    label="Имя"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно"
                        },
                    ]}
                >
                    <Input placeholder="Имя" />
                </Form.Item>

                <Form.Item<UserRegistrationDTO>
                    label="Фамилия"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно"
                        },
                    ]}
                >
                    <Input placeholder="Фамилия" />
                </Form.Item>

                <Form.Item<UserRegistrationDTO>
                    label="Дата рождения"
                    name="birthdate"
                    rules={[
                        {
                            required: true,
                            message: "Поле обязательно"
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item<UserRegistrationDTO>
                    label="Роль"
                    name="roleId"
                >
                    <Radio.Group>
                        {roles.map((role) => {
                            return <Radio value={role.id}>{role.name}</Radio>
                        })}
                    </Radio.Group>
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