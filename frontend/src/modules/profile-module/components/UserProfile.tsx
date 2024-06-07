import { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Descriptions, DescriptionsProps, Avatar, Tabs, TabsProps, Button } from "antd";
import { useStores } from "../../../hooks/RootContext";
import { useNavigate, useParams } from "react-router";
import { IMAGE_ADDRESS } from "../../../utils/APIConstants";
import UserService from "../services/UserService";
import UpdateForm from "./UpdateForm";

const UserProfile = observer(() => {

    const { authStore, userStore } = useStores()

    const { id  } = useParams();

    const { getUserInfo, getUserInfoById } = UserService

    const navigate = useNavigate()


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                
                let userInfo;

                console.log(id)

                if (id !== undefined) {
                    userInfo = await getUserInfoById(id);
                }
                else {
                    userInfo = await getUserInfo();
                }

                if (!authStore.checkAuth()) {
                    console.log("Invalid token");
                    navigate("/login");
                    return;
                }

                if (!userInfo) {
                    navigate("/login");
                    return;
                }

                await userStore.UpdateUser(userInfo);
            } catch (error) {
                console.error("Failed to fetch user info", error);
                navigate("/login");
            }
        };

        fetchUserInfo();
    }, [authStore, getUserInfo, getUserInfoById, navigate, userStore, id]);

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
            children: new Date(userStore.User.birthdate).toLocaleDateString()
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
            {id === undefined ? null : <Button onClick={() => navigate("/dashboard/profile")}>Перейти к своему профилю</Button>}
        </>
    );

})

export default UserProfile