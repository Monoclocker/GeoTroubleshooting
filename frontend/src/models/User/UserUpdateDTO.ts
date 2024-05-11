interface UserInfoDTO {
    username: string,
    email: string,
    firstname: string,
    surname: string,
    newPassword?: string,
    birthdate: Date,
    photo: string
}

export default UserInfoDTO