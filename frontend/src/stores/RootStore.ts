import { AuthStore } from "../modules/auth-module/exports";
import { ChatStore, GroupsStore } from "../modules/chat-module/exports";
import { MapStore } from "../modules/map-module/exports";
import { UserStore } from "../modules/profile-module/exports";

class RootStore {

    authStore = new AuthStore()
    userStore = new UserStore()
    mapStore = new MapStore()
    chatStore = new ChatStore()
    groupsStore = new GroupsStore()

}

export default RootStore;