import { useEffect } from "react"
import { useAPI } from "../services/useAPI"

function Profile() {

    const { fetchTrigger } = useAPI("User/getUserInfo")

    useEffect(() => {
        (async function APIRequest(){
            const { StatusCode, Body } = await fetchTrigger("POST")

            if (StatusCode == 200) {
                console.log(Body)
            }
        })()
        

    })

    return (
        <>
            
        </>
    )
}

export default Profile