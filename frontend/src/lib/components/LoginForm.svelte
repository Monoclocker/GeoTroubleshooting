<script lang="ts">
    import { Form, FormGroup, InputGroup, InputGroupText, Input, Button, Alert} from "@sveltestrap/sveltestrap";
    import { AuthService } from "../services/AuthService";
    import { navigate} from "svelte-routing"
    import type { IUser } from "../types/IUser";
    import type { ITokens } from "../types/ITokens";

    let user: IUser = {
        userName:"",
        password:""
    }

    const {Login} = AuthService()

    let validated = false
    let notificationOpened = false
    let showPassword = false

    const handleAuthorization = async(event: SubmitEvent) =>{
        event.preventDefault()

        try{
            const responce: Response = await Login(user)
            
            if (responce.status == 200){

                responce.json().then((data) => {

                    const {refreshToken, accessToken}: ITokens = data as ITokens
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('refreshToken', refreshToken)
                })

                navigate('/dashboard/profile')
            }
            else{
                throw new Error()
            }
        }
        catch{
            notificationOpened = true
            setTimeout(()=>{
                notificationOpened = false
            }, 1000)
        }
    }
</script>

<Form {validated} on:submit={handleAuthorization}>
    <FormGroup>
        <Input 
            type="text"
            placeholder = "Введите имя пользователя"
            bind:value={user.userName}
            required
        />
    </FormGroup>

    <FormGroup>
        <InputGroup>
            <Input 
                placeholder = "Введите пароль" 
                type={showPassword ? "text":"password" }
                required
                bind:value={user.password}
                />
            <InputGroupText>
                <Input type="checkbox" bind:checked={showPassword}/>
                показать
            </InputGroupText>
        </InputGroup>
    </FormGroup>

    <Button type="submit" color="primary" on:click={() => validated = true}>
        Войти
    </Button>

    <Button type="button" on:click={() => navigate('/registration')}>
        Перейти к регистрации
    </Button>
</Form>
    
<Alert isOpen={notificationOpened} dismissible fade color='primary'>Что то пошло не так!</Alert>
