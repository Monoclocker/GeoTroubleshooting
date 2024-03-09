import { AuthStore } from "../stores/AuthStore"
import { ADDRESS, LOGIN_PATH, REGISTER_PATH, VERIFY_PATH } from "../utils/APIConstants"

export const AuthService = (store: AuthStore) => {

    const VerifyRefreshToken = async (refreshToken: string|null) => {

        if (refreshToken == null) {
            SignOut()
            return
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

        store.setAuth(true, data)

        return true
    }


    const Login = async (loginData: UserLoginDTO) => {
        const responce = await fetch(ADDRESS + LOGIN_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(loginData)
        })

        if (!responce.ok) return false

        const data: ITokens = await responce.json()

        store.setAuth(true, data)

        return true;
    }

    const Register = async (registrationData: UserRegistrationDTO) => {
        const responce = await fetch(ADDRESS + REGISTER_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(registrationData)
        })


        if (!responce.ok) return false

        return true
    }

    const SignOut = () => {
        store.setAuth(false)
    }

    return { Login, Register, SignOut, VerifyRefreshToken }

}