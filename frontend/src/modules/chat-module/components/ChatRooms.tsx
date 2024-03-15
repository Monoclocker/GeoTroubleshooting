import { useEffect } from "react"
import { useStores } from "../../../hooks/RootContext"

const ChatRooms = () => {

    const { groupsStore } = useStores()

    useEffect(() => {
        groupsStore.initGroups()
    }, [])

    return <>

        {groupsStore.userGroups.map((group) => {
            return group.name 
        })}

    </>
}

export { ChatRooms }