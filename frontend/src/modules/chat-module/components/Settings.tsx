import { AutoComplete, Button, Card, SelectProps } from "antd";
import { useEffect, useState } from "react";
import UtilsService from "../../../utils/UtilsService";
import GroupsService from "../services/GroupsService";
import AddGroupDTO from "../../../models/Groups/AddGroupDTO";
import GroupUser from "../../../models/Groups/GroupUser";
import { useStores } from "../../../hooks/RootContext";
import { useNavigate } from "react-router";
import ChatHub from "../services/ChatHub";
import { Link } from "react-router-dom";

interface props {
    id: number
}

const Settings = (props: props) => {

    const { GetUsernames } = UtilsService
    const { GetGroup, DeleteGroup } = GroupsService
    const { AddToGroup, RemoveFromGroup } = GroupsService
    const { userStore } = useStores()
    const navigate = useNavigate()
    const [users, setUsers] = useState<GroupUser[]>([])
    const [adminUsername, setUsername] = useState<string>("")
    const { connection } = ChatHub()
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

    useEffect(() => {
        const func = async () => {
            const group = await GetGroup(props.id)

            if (group !== undefined) {
                setUsers(group.users)
                setUsername(group.users.filter(x => x.isAdmin)[0].username)
            }
            else {
                navigate("/dashboard/chat")
                return
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

    const deleteGroup = async () => {
        const result = await DeleteGroup(props.id)
        if (result) {
            connection.off("NewMessage")
            navigate("/dashboard/chat")
            return
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
            </AutoComplete>

            {userStore.User.username === adminUsername ? 
                <Button onClick={() => deleteGroup()}>Удалить группу</Button>
                :
                null
            }
            
            {users.map((user) => {
                return (<p>
                    <Card>
                        <Link to={"/profile/" + user.username }>{user.username}</Link>
                        {user.username === userStore.User.username || userStore.User.username !== adminUsername ?
                            null :
                            <Button onClick={() => deleteUser(user.username)}>Удалить</Button>
                        }
                    </Card>
                    
                </p>)
            })}
            
        </>
        

        

    );
};

export default Settings