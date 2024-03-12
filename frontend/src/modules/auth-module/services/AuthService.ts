import { ADDRESS, LOGIN_PATH, REGISTER_PATH } from "../../../utils/APIConstants"
import { IUser } from "../../../vite-env"

const Login = (loginData: IUser) : Promise<Response> => {

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

export { Login, Register}