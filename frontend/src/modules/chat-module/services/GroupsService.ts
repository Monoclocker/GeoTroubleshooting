import { ADDRESS, GETGROUPS_PATH } from "../../../utils/APIConstants"

const GetGroups = () => {
    return fetch(ADDRESS + GETGROUPS_PATH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            "Accept": "application/json"
        }
    })
}

export { GetGroups }