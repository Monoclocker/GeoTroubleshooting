import TokensDTO from "../../../models/Auth/TokensDTO";
import UserInfoDTO from "../../../models/User/UserInfoDTO";
import { ADDRESS, USERINFO_PATH, VERIFY_PATH } from "../../../utils/APIConstants";

const VerifyRefreshToken = (refreshToken: string | null) => {

    if (refreshToken == null) {
        return false
    }

    const token: TokensDTO = { refreshToken: refreshToken } 

    fetch(ADDRESS + VERIFY_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(token)
    })
        .then((responce) => {
            if (responce.status == 403) {
                return false
            }

            responce.json().then((data) => {
                const { accessToken, refreshToken }: TokensDTO = data as TokensDTO
                localStorage.setItem("accessToken", accessToken!)
                localStorage.setItem("refreshToken", refreshToken!)
            })

            return true

        })
        .catch(() => {
            return false
        })
}

const getUserInfo = (): Promise<UserInfoDTO> => {

    return fetch(ADDRESS + USERINFO_PATH, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    }).then((response) => {

        if (response.status == 200) {
            return response.json()
        }

        if (response.status == 401 && !VerifyRefreshToken(localStorage.getItem("refreshToken"))) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            window.location.reload()
            Promise.reject()
            return
        }

        return getUserInfo()
    })

}

export { getUserInfo }