import MarkersGetDTO from "../../../models/Marker/MarkerGetDTO";
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO";
import { ADDRESS, MARKERS_PATH } from "../../../utils/APIConstants";

async function GetMarkers(body: MarkersGetDTO) {
    const responce = await fetch(ADDRESS + MARKERS_PATH + "?startTimestamp=" + body.startTimeStamp
        + "&endTimestamp=" + body.endTimeStamp + "&placeId=" + body.placeId + (body.markerId === null ? "&markerId=" + body.markerId : ""), {
        method: "GET",
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
    })

    if (responce.ok) {
        return await responce.json() as MarkerInfoDTO[]
    }

    return []
}

export default { GetMarkers }