import { AuthStore } from "./AuthStore";
import UserStore from "./UserStore"

class RootStore {

    userStore: UserStore
    authStore: AuthStore

    constructor() {
        this.userStore = new UserStore()
        this.authStore = new AuthStore()
    }
}

export default RootStore;