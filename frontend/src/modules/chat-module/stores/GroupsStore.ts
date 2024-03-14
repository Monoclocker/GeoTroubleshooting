import { makeAutoObservable } from "mobx";
import { IGroup } from "../../../vite-env";

class GroupsStore {

    userGroups: IGroup[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async initGroups() {
        
    }

}

export { GroupsStore }
