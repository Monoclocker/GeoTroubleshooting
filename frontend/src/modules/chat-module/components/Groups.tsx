import { useEffect, useState } from "react"
import { useStores } from "../../../hooks/RootContext"
import GroupsService from "../services/GroupsService"
import Card from "antd/es/card/Card"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"

const Groups = observer(() => {

    const { groupsStore, userStore, mapStore } = useStores()
    const { GetGroups } = GroupsService

    const [page, setPage] = useState(0)

    useEffect(() => {
        const func = async() => {
            const groups = await GetGroups({ pageId: page, username: userStore.User.username, placeId: mapStore.Filter.placeId })
            console.log(groups)
            await groupsStore.GetGroups(groups.groups)
        }

        func()

        console.log(groupsStore.UserGroups)

    }, [])

    return <>

        {groupsStore.userGroups.map((group) => {
            return (
                <Card title={<Link to={group.id.toString()}>{group.name}</Link>} bordered={true}>
                <p>{group.description}</p>
            </Card>)
        })}


    </>
})

export default Groups