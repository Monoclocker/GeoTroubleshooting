import { makeAutoObservable } from "mobx"
import { IUser } from "../vite-env"

export class AuthStore {
    user = {} as IUser
    isAuth?: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get getUser() {
        return { ...this.user }
    }

    get getAuth() {
        return this.isAuth
    }


    setAuth(isAuth: boolean, tokens?: ITokens) {

        this.isAuth = isAuth

        if (isAuth && tokens) {
            localStorage.setItem("accessToken", tokens.accessToken)
            localStorage.setItem("refreshToken", tokens.refreshToken)
        }

        else {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        }
    }

    setUser(user: IUser) {
        this.user = user
    }



}