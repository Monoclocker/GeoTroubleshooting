import { AutoComplete, Button, Input, SelectProps } from "antd";
import { useEffect, useState } from "react";
import UtilsService from "../../../utils/UtilsService";
import GroupsService from "../services/GroupsService";
import AddGroupDTO from "../../../models/Groups/AddGroupDTO";
import GroupUser from "../../../models/Groups/GroupUser";
import { useStores } from "../../../hooks/RootContext";

interface props {
    id: number
}

const Settings = (props: props) => {

    const { GetUsernames } = UtilsService
    const { GetGroup } = GroupsService
    const { AddToGroup, RemoveFromGroup } = GroupsService
    const { userStore } = useStores()

    const [users, setUsers] = useState<GroupUser[]>([])

    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

    useEffect(() => {
        const func = async () => {
            const group = await GetGroup(props.id)

            if (group !== undefined) {
                setUsers(group.users)
            }
        }

        func()

    }, [])

    const handleSearch = async (value: string) => {
        if (value === null) {
            setOptions([])
        }

        else {
            const names: string[] = await GetUsernames(value)
            setOptions(names.map((name) => {
                return {
                    value: name,
                    label: name
                }
            }))
        }


    };

    const onSelect = async (value: string) => {

        const values: AddGroupDTO = { username: value, groupId: props.id }

        const result = await AddToGroup(values)

        if (result) {
            setUsers([...users, { isAdmin: false, username:value }])
        }

    };

    const deleteUser = async (username: string) => {

        users.forEach(user => console.log(user.username == userStore.User.username))

        if (users.filter(user => user.username == userStore.User.username)[0].isAdmin == false) {
            return
        }

        const result = await RemoveFromGroup({ username: username, groupId: props.id })
        if (result) {
            setUsers(users.filter((user) => user.username != username))
        }
    }

    return (
        <>
            <AutoComplete
                popupMatchSelectWidth={252}
                style={{ width: 300 }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
                size="large"
            >
                {/*<Input.Search size="large" placeholder="input here" enterButton />*/}
            </AutoComplete>
            {users.map((user) => {
                return (<p>
                    <span>{user.username}</span>
                    {user.username !== userStore.User.username ?
                        <Button onClick={() => deleteUser(user.username)}>X</Button>
                        :
                        null
                    }
                </p>)
            })}
            
        </>
        

        

    );
};

export default Settings