import RolesDTO from "../models/General/RolesDTO";
import PlaceTypeDTO from "../models/Places/PlaceTypeDTO";
import { ADDRESS, PlACES_PATH, ROLES_UTILS, SEARCH_PATH, UPLOAD_PATH } from "./APIConstants";
async function GetRoles() {
    const responce = await fetch(ADDRESS + ROLES_UTILS, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const body = await responce.json() as RolesDTO[]

    return body
}

async function UploadFiles(data: FormData) {
    const responce = await fetch(ADDRESS + UPLOAD_PATH, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        },
        body: data
    })

    if (responce.status == 200) {
        return true
    }

    return false
}

async function GetUsernames(input: string) {
    const responce = await fetch(ADDRESS + SEARCH_PATH + input, {
        method: "GET",
    })

    if (responce.status == 200) {
        return await responce.json() as string[]
    } 

    return []
}


async function GetPlaces() {
    const responce = await fetch(ADDRESS + PlACES_PATH, {
        method: "GET",
    })

    let body = null

    if (responce.status == 200) {
        body = await responce.json() as PlaceTypeDTO[]
    }

    return body
}

export default { GetRoles, UploadFiles, GetUsernames, GetPlaces }