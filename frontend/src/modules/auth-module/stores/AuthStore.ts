import { makeAutoObservable } from "mobx"
import { Login, Register } from "../services/AuthService"
import TokensDTO from "../../../models/Auth/TokensDTO"
import UserRegistrationDTO from "../../../models/Auth/UserRegistrationDTO"
import UserLoginDTO from "../../../models/Auth/UserLoginDTO"

export class AuthStore {

    constructor() {
        makeAutoObservable(this)
    }

    checkAuth() {
        return localStorage.getItem("accessToken") !== null
    }

    logout() {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }

    async Login(userDTO: UserLoginDTO) {

        const response = await Login(userDTO)

        if (response.status == 400) {
            
            throw new Error("Пользователя не существует")
        }

        const { refreshToken, accessToken }: TokensDTO = await response.json() as TokensDTO

        localStorage.setItem("refreshToken", refreshToken!)
        localStorage.setItem("accessToken", accessToken!)
    }

    async Register(userDTO: UserRegistrationDTO) {

        const response = await Register(userDTO)

        if (response.status == 400) {
            throw new Error("Учётные данные заняты")
        }
    }
}