import { AuthStore } from "../stores/AuthStore";
import { ADDRESS, USERINFO_PATH } from "../utils/APIConstants";
import { AuthService } from "./AuthService";

export const UserService = (store: AuthStore) => {

    const getUserInfo = async (): Promise<boolean> => {
        
        const { VerifyRefreshToken, SignOut } = AuthService(store)

        if (localStorage.getItem("accessToken") == null) {
            SignOut()
            return false
        }

        const responce = await fetch(ADDRESS + USERINFO_PATH, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })

        if (responce.ok) {

            const data: IUser = await responce.json()
            
            store.setUser(data)
            return true
        }

        if (!await VerifyRefreshToken(localStorage.getItem("refreshToken"))) {
            SignOut()
            return false
        }

        return getUserInfo()
    }

    return { getUserInfo }
}