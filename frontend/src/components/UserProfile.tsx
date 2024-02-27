import { useEffect, useState } from "react";
import { useStores } from "./RootContext";
import { UserService } from "../services/UserService";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";

const UserProfile = observer(() => {

    const [user, setUser] = useState<IUser>({} as IUser)
    const navigate = useNavigate();
    const { authStore } = useStores()
    const { getUserInfo } = UserService(authStore)

   useEffect(() => {
        const loadData = async () => {

            if (!await getUserInfo()) {
                navigate("/")
            }

           

            console.log(authStore.getUser)
            setUser(authStore.getUser)
            console.log(authStore.getUser)
        }

        loadData();
       
    }, [])

    return (
        <>
            <p>{user.email}</p>
            <p>{user.userName}</p>
        </>
    );

})

export default UserProfile