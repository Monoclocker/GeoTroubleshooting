import {FormEvent, useState } from "react"
import UseRegistration from "../services/UseRegistration"
import { redirect } from "react-router-dom"

export default function RegisterForm() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const registration = UseRegistration(login, password)

    async function submit(event: FormEvent) {

        event.preventDefault();

        if (await registration.Result() != 200) {
            console.log("Error")
        }



    }

    return (<>

        <div>
            <form onSubmit={(event) => submit(event)}>
                <input
                    type="text"
                    onChange={(event) => setLogin(event?.target?.value)}
                    value={login}>
                </input>
                <input
                    type="password"
                    onChange={(event) => setPassword(event?.target?.value)}
                    value={password}>
                </input>
                <input
                    type="submit"
                    value="Зарегистрироваться">
                </input>
            </form>
        </div>

    </>)

}