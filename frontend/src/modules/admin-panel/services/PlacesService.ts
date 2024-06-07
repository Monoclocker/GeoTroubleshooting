import PlaceDTO from "../../../models/Places/PlaceDTO"
import PlaceTypeDTO from "../../../models/Places/PlaceTypeDTO"
import { ADDRESS, PlACES_PATH } from "../../../utils/APIConstants"
import { VerifyRefreshToken } from "../../auth-module/exports"

async function AddType(type: PlaceTypeDTO) {
    const responce = await fetch(ADDRESS + PlACES_PATH + "/type", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(type)
    })

    let body = null

    if (responce.status == 200) {
        body = await responce.json() as PlaceTypeDTO
        return body
    }

    if (responce.status == 403) {
        return null
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return body
    }
    else {
        return await AddType(type)
    }
}

async function AddPlace(place: PlaceDTO, typeId: number) {
    const responce = await fetch(ADDRESS + PlACES_PATH + "/place/" + typeId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(place)
    })

    let body = null

    if (responce.status == 200) {
        body = await responce.json() as PlaceDTO
        return body
    }

    if (responce.status == 403) {
        return null
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return body
    }
    else {
        return await AddPlace(place, typeId)
    }
}

async function DeleteType(typeId: number) {
    const responce = await fetch(ADDRESS + PlACES_PATH + "/type/" + typeId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    })

    if (responce.status == 200) {
        return true
    }

    if (responce.status == 403) {
        return false
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return false
    }
    else {
        return await DeleteType(typeId)
    }
}

async function DeletePlace(typeId: number) {
    const responce = await fetch(ADDRESS + PlACES_PATH + "/place/" + typeId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    })

    if (responce.status == 200) {
        return true
    }

    if (responce.status == 403) {
        return false
    }

    if (responce.status == 401 && !await VerifyRefreshToken()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return false
    }
    else {
        return await DeletePlace(typeId)
    }
}

export default { AddType, AddPlace, DeletePlace, DeleteType }