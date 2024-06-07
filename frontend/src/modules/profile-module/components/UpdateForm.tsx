import { Button, DatePicker, Form, Input, Upload, UploadFile, UploadProps, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons"
import UserUpdateDTO from "../../../models/User/UserUpdateDTO";
import UserInfoDTO from "../../../models/User/UserInfoDTO";
import UtilsService from "../../../utils/UtilsService";
import { useState } from "react";
import { useStores } from "../../../hooks/RootContext";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import { useNavigate } from "react-router";

const UpdateForm = observer((user: UserInfoDTO) => {

    const { userStore } = useStores()
    const { UploadFiles } = UtilsService
    const [formFiles, setFormFiles] = useState<UploadFile[]>([])
    const [api, context] = notification.useNotification()

    const navigate = useNavigate()

    const openNotification = () => {
        api.info({
            message: "Данные обновлены",
            placement: 'topRight'
        })
    }

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

    const onFinished = async (values: UserUpdateDTO) => {
        console.log(values)
        const formData = new FormData()

        let newPhoto = user.photo

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

        try {

            const result = await UserService.updateUserInfo(values)

            if (!result) {
                navigate("/login");
                return;
            }

            const updatedUser = {} as UserInfoDTO

            updatedUser.birthdate = values.birthdate
            updatedUser.email = values.email
            updatedUser.firstname = values.firstname
            updatedUser.photo = values.photo
            updatedUser.role = user.role
            updatedUser.username = user.username
            updatedUser.surname = values.surname

            await userStore.UpdateUser(updatedUser)
            openNotification()

        } catch (error) {
            console.error("Failed to fetch user info", error);
            navigate("/login");
        }
    }


    return (
        <>
            {context}
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
        </>
        
    );
});

export default UpdateForm
