const UseRegistration = (login: string, password: string) => {

    async function Result(): Promise<number> {

        const RegistrationResult: Response = await fetch("localhost", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "login": login,
                "password": password
            })
        })
       
        return RegistrationResult.status

    }

    return { Result };
}

export default UseRegistration;