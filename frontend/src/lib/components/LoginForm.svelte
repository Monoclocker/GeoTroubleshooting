<script lang="ts">
    import { Form, FormGroup, Input, Button, Alert} from "@sveltestrap/sveltestrap";
    import { AuthService } from "../services/AuthService";
    import { navigate, Link } from "svelte-routing"

    let user: IUser = {
        userName:"",
        password:""
    }

    const {Login} = AuthService()

    let validated = false
    let notificationOpened = false

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
    <FormGroup floating label="Имя пользователя">
        <Input 
            type="text"
            placeholder = "Введите имя пользователя"
            bind:value={user.userName}
            required
        />
    </FormGroup>

    <FormGroup floating label="Пароль">
        <Input 
            placeholder = "Введите пароль" 
            type="password" 
            required
            bind:value={user.password}
        />
    </FormGroup>

    <Button type="submit" color="primary" on:click={() => validated = true}>
        Войти
    </Button>

    <Button type="button" on:click={() => navigate('/registration')}>
        Перейти к регистрации
    </Button>
</Form>
    
<Alert isOpen={notificationOpened} dismissible fade color='primary'>Что то пошло не так!</Alert>
