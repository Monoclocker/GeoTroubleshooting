import UserLoginDTO from "../../../models/Auth/UserLoginDTO"
import UserRegistrationDTO from "../../../models/Auth/UserRegistrationDTO"
import { ADDRESS, LOGIN_PATH, REGISTER_PATH } from "../../../utils/APIConstants"

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

export { Login, Register}