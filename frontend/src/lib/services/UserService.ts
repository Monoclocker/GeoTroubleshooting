
import type { IUser } from "../types/IUser";
import { ADDRESS, USERINFO_PATH } from "../utils/APIPath";
import { AuthService } from "./AuthService";

export const UserService = () => {

    //надо поразмыслить

    const {VerifyRefreshToken} = AuthService()

    const getUserInfo = (): Promise<IUser> => {
        
        return fetch(ADDRESS + USERINFO_PATH, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then((response) =>{

            if (response.status == 200){
                
                return response.json()
            }

            if(response.status == 401 && !VerifyRefreshToken(localStorage.getItem("refreshToken"))){
                throw new Error()
            }

            return getUserInfo()
        })
        
    }

    return { getUserInfo }
}