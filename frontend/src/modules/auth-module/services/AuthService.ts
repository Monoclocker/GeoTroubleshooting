import TokensDTO from "../../../models/Auth/TokensDTO"
import UserLoginDTO from "../../../models/Auth/UserLoginDTO"
import UserRegistrationDTO from "../../../models/Auth/UserRegistrationDTO"
import { ADDRESS, LOGIN_PATH, REGISTER_PATH, VERIFY_PATH } from "../../../utils/APIConstants"



const Login = (loginData: UserLoginDTO): Promise<Response> => {

    return fetch(ADDRESS + LOGIN_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(loginData)
    })

}

const Register = (registrationData: UserRegistrationDTO) => {
    return fetch(ADDRESS + REGISTER_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(registrationData)
    })
}

const VerifyRefreshToken = async() => {

    if (localStorage.getItem("refreshToken") == null) {
        return false
    }

    const token: TokensDTO = { refreshToken: localStorage.getItem("refreshToken")! }

    const responce = await fetch(ADDRESS + VERIFY_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("refreshToken")
        },
        body: JSON.stringify(token)
    })

    if (responce.status != 403) {
        const data = await responce.json()

        const { accessToken, refreshToken }: TokensDTO = data as TokensDTO
        localStorage.setItem("accessToken", accessToken!)
        localStorage.setItem("refreshToken", refreshToken!)
        return true
    }

    return false
}


export { Login, Register, VerifyRefreshToken}