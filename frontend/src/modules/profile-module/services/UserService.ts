import { ADDRESS, USERINFO_PATH, VERIFY_PATH } from "../../../utils/APIConstants";
import { ITokens, IUser } from "../../../vite-env";

const VerifyRefreshToken = (refreshToken: string | null) => {

    if (refreshToken == null) {
        return false
    }

    fetch(ADDRESS + VERIFY_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ "refreshToken": refreshToken })
    })
        .then((responce) => {
            if (responce.status == 400) {
                return false
            }

            responce.json().then((data) => {
                const { accessToken, refreshToken }: ITokens = data as ITokens
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", refreshToken)
            })

            return true

        })
        .catch(() => {
            return false
        })
}

const getUserInfo = (): Promise<IUser> => {

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
            throw new Error()
        }

        return getUserInfo()
    })

}

export { getUserInfo }