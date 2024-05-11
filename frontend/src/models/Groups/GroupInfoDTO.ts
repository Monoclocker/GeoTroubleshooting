import GroupUser from "./GroupUser"

interface GroupInfoDTO {
    id: number
    name: string
    description?: string
    users: GroupUser[]
}

export default GroupInfoDTO