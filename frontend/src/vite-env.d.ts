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


interface ITokens {
    accessToken: string,
    refreshToken: string
}

interface IUser {
    userName: string,
    email: string
}