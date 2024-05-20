import { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Descriptions, DescriptionsProps, Avatar, Tabs, TabsProps } from "antd";
import { useStores } from "../../../hooks/RootContext";
import { useNavigate } from "react-router";
import { IMAGE_ADDRESS } from "../../../utils/APIConstants";
import UserService from "../services/UserService";
import UpdateForm from "./UpdateForm";

const UserProfile = observer(() => {

    const { authStore, userStore } = useStores()

    const { getUserInfo } = UserService

    const navigate = useNavigate()


    useEffect(() => {
        const func = async () => {
            if (!authStore.checkAuth()) {
                console.log("error")
                navigate("/login")
                return
            }

            const userInfo = await getUserInfo()

            if (userInfo != null) {
                await userStore.UpdateUser(userInfo)
                return
            }

            navigate("/login")
        }

        func()
    }, [])

    const profileItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: "Имя пользователя",
            children: userStore.User.username
        },
        {
            key: '2',
            label: "Электронная почта",
            children: userStore.User.email
        },
        {
            key: '3',
            label: "Имя",
            children: userStore.User.firstname
        },
        {
            key: '4',
            label: "Фамилия",
            children: userStore.User.surname
        },
        {
            key: '5',
            label: "Дата рождения",
            children: userStore.User.birthdate
        }
    ]



    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Профиль',
            children: <Descriptions title="Контактные данные" layout="vertical" items={profileItems} />
        },
        {
            key: '2',
            label: 'Настройки',
            children: <UpdateForm {...userStore.User} />
        }
    ]

    return (
        <>
            <Avatar size={64} icon={<img src={IMAGE_ADDRESS + userStore.User.photo} />} />
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );

})

export default UserProfile