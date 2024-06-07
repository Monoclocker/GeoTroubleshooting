import { makeAutoObservable } from "mobx";
import GroupInfoDTO from "../../../models/Groups/GroupInfoDTO";

class GroupsStore {

    userGroups: GroupInfoDTO[] = []
    groupsCount = 0
    currentPage = 1

    constructor() {
        makeAutoObservable(this)
    }

    get UserGroups() {
        return this.userGroups
    }

    async GetGroups(groups: GroupInfoDTO[], count: number) {
        this.userGroups = groups
        this.groupsCount = count
    }

    async SetPage(page: number) {
        this.currentPage = page
    }

}

export { GroupsStore }
