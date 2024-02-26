/// <reference types="vite/client" />

type UserRegistrationDTO = {
    Username: string,
    Password: string,
    Email: string
}

type UserLoginDTO = {
    Username: string,
    Password: string
}

type APIResponce = {
    StatusCode: int,
    Body?: unknown
}

interface ITokens {
    accessToken: string,
    refreshToken: string
}

interface ErrorResponce {
    description: string
}

type APIMethod = "POST" | "GET" | "UPDATE" | "DELETE"

interface IUser {
    Username: string,
    Email: string
}