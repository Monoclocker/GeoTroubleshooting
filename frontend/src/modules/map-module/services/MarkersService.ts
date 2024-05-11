import MarkersGetDTO from "../../../models/Marker/MarkerGetDTO";
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO";
import { ADDRESS, MARKERS_PATH } from "../../../utils/APIConstants";

async function GetMarkers(body: MarkersGetDTO) {
    const responce = await fetch(ADDRESS + MARKERS_PATH, {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(body)
    })

    if (responce.ok) {
        return await responce.json() as MarkerInfoDTO[]
    }

    return []
}

export default { GetMarkers }