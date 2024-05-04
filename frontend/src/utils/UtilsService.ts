import RolesDTO from "../models/General/RolesDTO";
import { ADDRESS, ROLES_UTILS } from "./APIConstants";

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

export default { GetRoles }