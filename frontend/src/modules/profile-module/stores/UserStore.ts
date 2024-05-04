import { makeAutoObservable } from "mobx"
import { getUserInfo } from "../services/UserService"
import UserInfoDTO from "../../../models/User/UserInfoDTO"

export class UserStore {

    user: UserInfoDTO = {} as UserInfoDTO

    get User() {
        return { ...this.user }
    }

    constructor() {
        makeAutoObservable(this)
    }

    async GetUserInfo() {

        const response = await getUserInfo()
        
        this.user = { ...response }

    }

    
}