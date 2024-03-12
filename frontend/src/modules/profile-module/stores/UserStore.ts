import { makeAutoObservable } from "mobx"
import { IUser } from "../../../vite-env"
import { getUserInfo } from "../services/UserService"

export class UserStore {

    user: IUser = {} as IUser

    get User() {
        return { ...this.user }
    }

    constructor() {
        makeAutoObservable(this)
    }

    async GetUserInfo() {

        const response = await getUserInfo()

        this.user = {...response}
    }

    
}