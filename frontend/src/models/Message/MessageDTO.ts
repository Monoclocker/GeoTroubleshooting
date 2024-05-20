import Attachment from "../General/Attachment";

interface MessageDTO {
    id?: string,
    placeId?: number,
    groupId?: number,
    message: string,
    username: string,
    timestamp?: Date,
    attachments?: Attachment[]
}
export default MessageDTO