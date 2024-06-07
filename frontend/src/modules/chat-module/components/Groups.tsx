import { useEffect } from "react"
import { useStores } from "../../../hooks/RootContext"
import GroupsService from "../services/GroupsService"
import Card from "antd/es/card/Card"
import { observer } from "mobx-react-lite"
import { Link, useNavigate } from "react-router-dom"
import { Button, Pagination } from "antd"

const Groups = observer(() => {

    const { groupsStore, userStore, mapStore, authStore } = useStores()
    const navigate = useNavigate()
    const { GetGroups } = GroupsService

    useEffect(() => {
        const func = async () => {
            try {
                if (!authStore.checkAuth()) {
                    navigate("/login")
                    return
                }
                if (!userStore.User.username) {
                    navigate("/dashboard/profile")
                    return
                }

                const groups = await GetGroups({ pageId: 0, username: userStore.User.username, placeId: mapStore.Filter.placeId })

                if (groups.groups == undefined) {
                    navigate("/login")
                    return
                }
                await groupsStore.GetGroups(groups.groups, groups.groupsCount)
            }

            catch {
                navigate("/login")
                return
            }

            
        }
        func()

    }, [])

    const switchPage = async (page: number) => {
        const groups = await GetGroups({ pageId: page - 1, username: userStore.User.username, placeId: mapStore.Filter.placeId })
        await groupsStore.SetPage(page)
        await groupsStore.GetGroups(groups.groups!, groups.groupsCount)
    }

    const refresh = async () => {
        const groups = await GetGroups({ pageId: groupsStore.currentPage - 1, username: userStore.User.username, placeId: mapStore.Filter.placeId })
        await groupsStore.GetGroups(groups.groups!, groups.groupsCount)
    }

    return <>

        <span>
            <Pagination
                total={groupsStore.groupsCount}
                showTotal={(total) => `Всего ${total} групп`}
                onChange={(page) => switchPage(page)}
            />
            <Button onClick={() => refresh()}>Обновить</Button>
        </span>
        
        

        {groupsStore.userGroups.map((group) => (
                <Card key={group.id} title={<Link to={group.id.toString()}>{group.name}</Link>} bordered={true}>
                    <p>{group.description}</p>
                </Card>
            ))
        }


    </>
})

export default Groups