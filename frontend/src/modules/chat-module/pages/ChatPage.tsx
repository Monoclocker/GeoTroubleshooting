import { useParams } from "react-router"
import { ChatRooms } from "../components/ChatRooms"

const ChatPage = () => {

    const { id } = useParams()


    return <>

        {id ?
            null
            :
            <ChatRooms />
        }
    </>
}

export { ChatPage }