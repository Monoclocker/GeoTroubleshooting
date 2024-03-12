import { AuthStore } from "../modules/auth-module/exports";
import { UserStore } from "../modules/profile-module/exports";

class RootStore {

    authStore = new AuthStore()
    userStore = new UserStore()
}

export default RootStore;