import { useStores } from "../../../hooks/RootContext"
import GroupsService from "../services/GroupsService"
import { Button, Form, Input } from "antd"
import GroupCreateDTO from "../../../models/Groups/GroupCreateDTO"
import { observer } from "mobx-react-lite"

const GroupCreateForm = observer(() => {

    const { mapStore, userStore, groupsStore } = useStores();
    const { CreateGroup, GetGroups } = GroupsService

    const onFinish = async(values: GroupCreateDTO) => {
        values.username = userStore.User.username
        values.placeId = mapStore.Filter.placeId

        const result: boolean = await CreateGroup(values)

        if (result) {
            const groups = await GetGroups({ pageId: groupsStore.currentPage - 1, placeId: mapStore.Filter.placeId, username: userStore.User.username })
            await groupsStore.GetGroups(groups.groups, groups.groupsCount)
        }
    }

    return <>
        <Form
            onFinish={onFinish}
        >

            <Form.Item<GroupCreateDTO>
                name="name"
                rules={[{
                    required: true,
                    message: "Поле обязательно"
                }]}
            >
                <Input showCount placeholder="Название" maxLength={20} />
            </Form.Item>

            <Form.Item<GroupCreateDTO>
                name="description"
            >
                <Input showCount placeholder="Описание" maxLength={200 }/>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">Создать</Button>
            </Form.Item>

        </Form>

    </>
})

export default GroupCreateForm