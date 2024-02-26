import { makeAutoObservable } from "mobx"

class UserStore implements IUser {
    Username: string = '';
    Email: string = '';
    

    constructor() {
        makeAutoObservable(this)
    }

    updateUsername(newUsername: string) {
        this.Username = newUsername
    }

    updateEmail(newEmail: string) {
        this.Email = newEmail
    }
}

export default UserStore;