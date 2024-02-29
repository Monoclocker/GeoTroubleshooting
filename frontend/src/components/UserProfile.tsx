import { useEffect, useState } from "react";
import { useStores } from "./RootContext";
import { UserService } from "../services/UserService";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { Descriptions, DescriptionsProps } from "antd";
import Item from "antd/es/list/Item";

const UserProfile = observer(() => {

    const [user, setUser] = useState<IUser>({} as IUser)
    const navigate = useNavigate();
    const { authStore } = useStores()
    const { getUserInfo } = UserService(authStore)

   useEffect(() => {
       const loadData = async () => {

            if (Object.keys(authStore?.getUser).length === 0 && !await getUserInfo()) {
                navigate("/")
            }

            setUser(authStore.getUser)
        }

        loadData();
       
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