import { AutoComplete, Button, Input, SelectProps } from "antd";
import { useState } from "react";
import UtilsService from "../../../utils/UtilsService";
import GroupsService from "../services/GroupsService";
import AddGroupDTO from "../../../models/Groups/AddGroupDTO";

interface props {
    id: number
}

const Settings = (props: props) => {

    const { GetUsernames } = UtilsService
    const { AddToGroup, RemoveFromGroup } = GroupsService
    

    const [users, setUsers] = useState<string[]>([])

    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

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
            setUsers([...users, value])
        }

    };

    const deleteUser = async (username: string) => {
        const result = await RemoveFromGroup({ username: username, groupId: props.id })
        if (result) {
            setUsers(users.filter((user) => user != username))
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
                    <span>{user}</span>
                    <Button onClick={() => deleteUser(user)}>Удалить</Button>
                </p>)
            })}
            
        </>
        

        

    );
};

export default Settings