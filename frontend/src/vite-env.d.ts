/// <reference types="vite/client" />

import { LngLat } from "@yandex/ymaps3-types"
 

interface IMarkerInfo {
    username: string,
    coordinates: LngLat,
    title: string,
    description?: string
}

interface ITokens {
    accessToken: string,
    refreshToken: string
}

interface IUser {
    userName: string,
    email?: string
    password?: string
}