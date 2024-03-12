import { makeAutoObservable } from "mobx"
import { ITokens, IUser } from "../../../vite-env"
import { Login, Register } from "../services/AuthService"

export class AuthStore {

    isAuth: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    checkAuth() {
        return this.isAuth
    }

    async Login(userDTO: IUser) {

        const response = await Login(userDTO)

        if (response.status == 400) {
            throw new Error("Invalid input")
        }

        if (response.status == 401) {
            throw new Error("User doesn't exist")
        }

        const { refreshToken, accessToken }: ITokens = await response.json() as ITokens

        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("accessToken", accessToken)

        this.isAuth = true
    }

    async Register(userDTO: IUser) {

        const response = await Register(userDTO)

        if (response.status == 400) {
            throw new Error("Invalid input")
        }
    }
}