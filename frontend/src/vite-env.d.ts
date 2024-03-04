/// <reference types="vite/client" />

import { LngLat } from "@yandex/ymaps3-types"

type UserRegistrationDTO = {
    Username: string,
    Password: string,
    Email: string
}

type UserLoginDTO = {
    Username: string,
    Password: string
}

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
    email: string
}