import AddGroupDTO from "../../../models/Groups/AddGroupDTO"
import GetGroupDTO from "../../../models/Groups/GetGroupDTO"
import GroupCreateDTO from "../../../models/Groups/GroupCreateDTO"
import GroupInfoDTO from "../../../models/Groups/GroupInfoDTO"
import { ADDRESS, GROUPS_PATH } from "../../../utils/APIConstants"

const GetGroups = async (data: GetGroupDTO) => {
    const responce = await fetch(ADDRESS + GROUPS_PATH + "?pageId=" + data.pageId + "&username=" + data.username + "&placeId=" + data.placeId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "Accept": "application/json"
        }
    })

    if (!responce.ok) {
        return []
    }

    return await responce.json() as GroupInfoDTO[]

}

const CreateGroup = async (data: GroupCreateDTO) => {
    const responce = await fetch(ADDRESS + GROUPS_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!responce.ok) {
        return false
    }

    return true
}

const AddToGroup = async (data: AddGroupDTO) => {
    const responce = await fetch(ADDRESS + GROUPS_PATH, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!responce.ok) {
        return false
    }

    return true
}

const RemoveFromGroup = async (data: AddGroupDTO) => {
    const responce = await fetch(ADDRESS + GROUPS_PATH, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!responce.ok) {
        return false
    }

    return true
}

const DeleteGroup = async (id: number) => {
    const responce = await fetch(ADDRESS + GROUPS_PATH + '/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "Accept": "application/json"
        }
    })

    if (!responce.ok) {
        return false
    }

    return true
}


export default { GetGroups, CreateGroup, AddToGroup, RemoveFromGroup, DeleteGroup }