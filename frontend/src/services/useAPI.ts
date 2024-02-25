import {address } from "../utils/APIConstants"

export const useAPI = (path: string) => {

    const fetchTrigger = async (method: APIMethod, body?: object): Promise<APIResponce> => {
        const fetchResult = await fetch(address + path, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "true",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + (localStorage.getItem("access") ?? "")
            }
        })

        try {
            const result: JSON = await fetchResult.json()
            return {
                StatusCode: fetchResult.status,
                Body: result
            }
        }
        catch {
            return {
                StatusCode: fetchResult.status
            }
        }
    }

    //const refreshToken = async () => {
    //    const tokenResult = await fetch(address + "refresh", {
    //    method: "POST",
    //    headers: {
    //        "Access-Control-Allow-Origin": "true",
    //        "Content-Type": "application/json",
    //        "Accept": "application/json",
    //        "Authorization": "Bearer " + (localStorage.getItem("refresh") ?? "")
    //    }
    //})

    //try {
    //    const result: JSON = await fetchResult.json()
    //    return {
    //        StatusCode: fetchResult.status,
    //        Body: result
    //    }
    //}
    //catch {
    //    return {
    //        StatusCode: fetchResult.status
    //    }
    //}

    return { fetchTrigger }
}