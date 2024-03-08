/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ITokens {
    accessToken: string,
    refreshToken: string
}

interface IUser {
    userName: string,
    password?: string
    email?: string
}