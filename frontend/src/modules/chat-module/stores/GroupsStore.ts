import { makeAutoObservable } from "mobx";
import { IGroup } from "../../../vite-env";
import { GetGroups } from "../services/GroupsService";

class GroupsStore {

    userGroups: IGroup[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async initGroups() {
        const response = await GetGroups()

        if (!response.ok) {
            throw Error("error")
        }

        this.userGroups = await response.json() as IGroup[]
    }

}

export { GroupsStore }
