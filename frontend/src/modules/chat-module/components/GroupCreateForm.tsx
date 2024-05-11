import { useStores } from "../../../hooks/RootContext"
import GroupsService from "../services/GroupsService"
import { Button, Form, Input } from "antd"
import GroupCreateDTO from "../../../models/Groups/GroupCreateDTO"
import { useNavigate } from "react-router"

const GroupCreateForm = () => {

    const { mapStore, userStore } = useStores();
    const { CreateGroup } = GroupsService
    const navigate = useNavigate()

    const onFinish = async(values: GroupCreateDTO) => {
        values.username = userStore.User.username
        values.placeId = mapStore.getLocation().placeId

        console.log(values)

        const result: boolean = await CreateGroup(values)

        if (result) {
            navigate('/dashboard/chat')
            return
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
}

export default GroupCreateForm