import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Descriptions, DescriptionsProps, Avatar, Form, Input, Button, DatePicker, Tabs, TabsProps, Upload, UploadProps, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons"
import { useStores } from "../../../hooks/RootContext";
import { useNavigate } from "react-router";
import UserInfoDTO from "../../../models/User/UserInfoDTO";
import { IMAGE_ADDRESS } from "../../../utils/APIConstants";
import UserUpdateDTO from "../../../models/User/UserUpdateDTO";
import UtilsService from "../../../utils/UtilsService";
import FilesNamesDTO from "../../../models/General/FilesNamesDTO";


const UserProfile = observer(() => {

    const { authStore, userStore } = useStores()
    const { UploadFiles } = UtilsService
    const navigate = useNavigate()
    const [user, setUser] = useState<UserInfoDTO>({} as UserInfoDTO)
    const [formFiles, setFormFiles] = useState<UploadFile[]>([])

    const props: UploadProps = {
        onRemove: (file) => {
            const index = formFiles.indexOf(file);
            const newFileList = formFiles.slice();
            newFileList.splice(index, 1);
            setFormFiles(newFileList);
        },
        beforeUpload: (file) => {
            setFormFiles([file]);
            return false;
        },
        formFiles,
    }

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

    const onFinished = async (values: UserUpdateDTO) => {

        const formData = new FormData()

        let newPhoto =

        formFiles.forEach((file) => {
            formData.append('files', file)
            newPhoto = file.name
        })

        const uploadResult = await UploadFiles(formData)

        if (uploadResult === true) {
            values.photo = newPhoto
        }

        values.username = user.username
        if (values.birthdate === undefined) {
            values.birthdate = user.birthdate
        }

        const result = await userStore.UpdateUser(values)

        if (result === true) {
            window.location.reload();
        }

        console.log("Error")

    }



    const form = (
        <Form
            onFinish={onFinished}
            colon={false}
            style={{
                maxWidth: 800,
            }}
            wrapperCol={{ offset: 5 }}
            labelCol={{ offset: 5 }}
            labelWrap={false}
            initialValues={{
                'email': user.email,
                'firstname': user.firstname,
                'surname': user.surname
            }}
        >
            <Form.Item<UserUpdateDTO>
                label="Пароль"
                name="newPassword"
                rules={[
                    {
                        min: 8,
                        message: "Минимальная длина - 8 символов"
                    },
                    {
                        pattern: /[a-zA-z0-9]*/,
                        message: "Пароль должен содержать латинницу или цифры"
                    }
                ]}
            >
                <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item<UserUpdateDTO>
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

            <Form.Item<UserUpdateDTO>
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

            <Form.Item<UserUpdateDTO>
                label="Фамилия"
                name="surname"
                rules={[
                    {
                        required: true,
                        message: "Поле обязательно"
                    },
                ]}
            >
                <Input placeholder="Фамилия" />
            </Form.Item>
            <Form.Item>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Обновить фото профиля</Button>
                </Upload>
            </Form.Item>
            
            <Form.Item<UserUpdateDTO>
                label="Дата рождения"
                name="birthdate"
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