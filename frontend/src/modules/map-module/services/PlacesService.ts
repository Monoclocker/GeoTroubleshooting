import PlaceTypeDTO from "../../../models/Places/PlaceTypeDTO"
import { ADDRESS, PlACES_PATH } from "../../../utils/APIConstants"

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

export default { GetPlaces }