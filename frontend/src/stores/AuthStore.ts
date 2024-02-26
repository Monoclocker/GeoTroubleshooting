import { makeAutoObservable } from "mobx"

export class AuthStore {
    accessToken?: string
    refreshToken?: string
    isAuth?: boolean

    constructor() {
        makeAutoObservable(this)
    }

    setAccess(newAccess: string) {
        this.accessToken = newAccess;
    }

    setRefresh(newRefresh: string) {
        this.refreshToken = newRefresh; 
    }

    setIsAuth(newIsAuth: boolean) {
        this.isAuth = newIsAuth
    }




}