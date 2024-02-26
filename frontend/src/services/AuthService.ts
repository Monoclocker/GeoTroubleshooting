import { AuthStore } from "../stores/AuthStore"
import { ADDRESS, LOGIN_PATH, REGISTER_PATH } from "../utils/APIConstants"

export const AuthService = (store: AuthStore) => {
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
        
        store.setAccess(data.accessToken);
        store.setRefresh(data.refreshToken);
        store.setIsAuth(true)
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

    const SignOut = async () => {
        store.setIsAuth(false)
    }

    return { Login, Register, SignOut }

}