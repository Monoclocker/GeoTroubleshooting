
import type { ITokens } from "../types/ITokens"
import type { IUser } from "../types/IUser"
import { ADDRESS, LOGIN_PATH, REGISTER_PATH, VERIFY_PATH } from "../utils/APIPath"

export const AuthService = () => {

    const VerifyRefreshToken = (refreshToken: string|null) => {

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

            responce.json().then((data)=>{
                const {accessToken, refreshToken}: ITokens = data as ITokens
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", refreshToken)
            })

            return true

        })
        .catch(()=>{
            return false
        })

        
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