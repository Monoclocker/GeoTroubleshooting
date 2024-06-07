import UserInfoDTO from "../../../models/User/UserInfoDTO";
import UserUpdateDTO from "../../../models/User/UserUpdateDTO";
import { ADDRESS, USERINFO_PATH} from "../../../utils/APIConstants";
import { VerifyRefreshToken } from "../../auth-module/exports";

const getUserInfo = async(): Promise<UserInfoDTO | null> => {

    const responce = await fetch(ADDRESS + USERINFO_PATH, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    })

    if (responce.status == 200) {
        const data = await responce.json() as UserInfoDTO
        return data
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.reload()
        return null
    }
    else {
        return await getUserInfo()
    }
}

const getUserInfoById = async (id: string): Promise<UserInfoDTO | null> => {

    const responce = await fetch(ADDRESS + USERINFO_PATH + "?id=" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    })

    if (responce.status == 200) {
        const data = await responce.json() as UserInfoDTO
        return data
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.reload()
        return null
    }
    else {
        return await getUserInfoById(id)
    }
}

const updateUserInfo = async (dto: UserUpdateDTO): Promise<boolean> => {
    const responce = await fetch(ADDRESS + USERINFO_PATH, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(dto)
    })

    if (responce.status === 200) {
        return true
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return false
    }
    else {
        return await updateUserInfo(dto)
    }
}

export default { getUserInfo, getUserInfoById, updateUserInfo }