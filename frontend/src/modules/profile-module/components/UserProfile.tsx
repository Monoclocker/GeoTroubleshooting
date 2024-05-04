import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Descriptions, DescriptionsProps, Avatar, Form, Input, Button, DatePicker, Tabs, TabsProps, Upload, UploadProps  } from "antd";
import { useStores } from "../../../hooks/RootContext";
import { useNavigate } from "react-router";
import UserInfoDTO from "../../../models/User/UserInfoDTO";
import { IMAGE_ADDRESS } from "../../../utils/APIConstants";


const UserProfile = observer(() => {

    const { authStore, userStore } = useStores()

    let newPhotoName: string | null = null

    const navigate = useNavigate()
    const [user, setUser] = useState<UserInfoDTO>({} as UserInfoDTO)


    useEffect(() => {

        if (!authStore.checkAuth()) {
            navigate("/login")
            return
        }

        userStore.GetUserInfo()
            .then(() => setUser(userStore.User))


    }, [])

    const profileItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: "Имя пользователя",
            children: user.username
        },
        {
            key: '2',
            label: "Электронная почта",
            children: user.email
        },
        {
            key: '3',
            label: "Имя",
            children: user.firstname
        },
        {
            key: '4',
            label: "Фамилия",
            children: user.surname
        },
        {
            key: '5',
            label: "Дата рождения",
            children: user.birthdate
        }
    ]

    //придумать логику отправки фото и обновления профиля + прописать эндпоинт

    const form = (
        <Form
            scrollToFirstError
            onFinish={onFinished}
            colon={false}
            style={{
                maxWidth: 800,
            }}
            wrapperCol={{ offset: 5 }}
            labelCol={{ offset: 5 }}
            labelWrap={false}

        >
            <Form.Item<UserInfoDTO>
                label="Пароль"
                name="newPassword"
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

            <Form.Item<UserInfoDTO>
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

            <Form.Item<UserInfoDTO>
                label="Имя"
                name="firstname"
                rules={[
                    {
                        required: true,
                        message: "Поле обязательно"
                    },
                ]}
            >
                <Input placeholder="Имя" />
            </Form.Item>

            <Form.Item<UserInfoDTO>
                label="Фамилия"
                name="lastname"
                rules={[
                    {
                        required: true,
                        message: "Поле обязательно"
                    },
                ]}
            >
                <Input placeholder="Фамилия" />
            </Form.Item>
            <Upload>
            </Upload>
            <Form.Item<UserInfoDTO>
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

            <Form.Item>
                <Button type="primary" htmlType="submit">Обновить</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" danger>Удалить</Button>
            </Form.Item>

        </Form>
        
    )


    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Профиль',
            children: <Descriptions title="Контактные данные" layout="vertical" items={profileItems} />
        },
        {
            key: '2',
            label: 'Настройки',
            children: form
        }
    ]

    return (
        <>
            <Avatar size={64} icon={<img src={IMAGE_ADDRESS + user.photo} />} />
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );

})

export default UserProfile