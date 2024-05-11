import { makeAutoObservable } from "mobx"
import { getUserInfo, updateUserInfo } from "../services/UserService"
import UserInfoDTO from "../../../models/User/UserInfoDTO"
import UserUpdateDTO from "../../../models/User/UserUpdateDTO"

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

    async UpdateUser(info: UserUpdateDTO) {
        return await updateUserInfo(info)
    }

    
}