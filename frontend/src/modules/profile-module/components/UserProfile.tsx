import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Descriptions, DescriptionsProps } from "antd";
import { IUser } from "../../../vite-env";
import { useStores } from "../../../hooks/RootContext";
import { useNavigate } from "react-router";


const UserProfile = observer(() => {

    const { authStore, userStore } = useStores()


    const navigate = useNavigate()
    const [user, setUser] = useState<IUser>({} as IUser)

    useEffect(() => {

        if (!authStore.checkAuth()) {
            navigate("/login")
        }

        userStore.GetUserInfo()
            .then(() => setUser(userStore.User))

    }, [])

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: "Имя пользователя",
            children: user.userName
        },
        {
            key: '2',
            label: "Электронная почта",
            children: user.email
        },
    ]
   


    return (
        <>
            <Descriptions title="Контактные данные" layout="vertical" items={items} />
        </>
    );

})

export default UserProfile