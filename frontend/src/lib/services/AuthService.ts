
import { ADDRESS, LOGIN_PATH, REGISTER_PATH, VERIFY_PATH } from "../utils/APIPath"

export const AuthService = () => {

    const VerifyRefreshToken = async (refreshToken: string|null) => {

        if (refreshToken == null) {

            return false
        }

        const responce = await fetch(ADDRESS + VERIFY_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "refreshToken": refreshToken })
        })

        if (responce.status == 400) {
            SignOut()
            return false
        }

        const data: ITokens = await responce.json()

        return true
    }


    const Login = (loginData: IUser) => {
        
        return fetch(ADDRESS + LOGIN_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        
    }

    const Register = (registrationData: IUser) => {
        return fetch(ADDRESS + REGISTER_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(registrationData)
        })
    }

    const SignOut = () => {
    }

    return { Login, Register, SignOut, VerifyRefreshToken }

}