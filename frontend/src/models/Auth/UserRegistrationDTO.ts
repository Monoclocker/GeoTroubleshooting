interface UserRegistrationDTO {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    birthdate: Date,
    roleId: number
}

export default UserRegistrationDTO