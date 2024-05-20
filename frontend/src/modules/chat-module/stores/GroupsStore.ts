import { makeAutoObservable } from "mobx";
import GroupInfoDTO from "../../../models/Groups/GroupInfoDTO";

class GroupsStore {

    userGroups: GroupInfoDTO[] = []

    constructor() {
        makeAutoObservable(this)
    }

    get UserGroups() {
        return { ...this.userGroups }
    }

    async GetGroups(groups: GroupInfoDTO[]) {
        this.userGroups = groups
    }

}

export { GroupsStore }
