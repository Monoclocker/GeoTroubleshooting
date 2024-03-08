<script lang="ts">
    import { Form, FormGroup, Input, Button, Alert} from "@sveltestrap/sveltestrap";
    import { AuthService } from "../services/AuthService";
    import { navigate, Link } from "svelte-routing"

    let user: IUser = {
        userName:"",
        password:"",
        email: ""
    }

    const {Register} = AuthService()

    let validated = false
    let notificationOpened = false

    const handleAuthorization = async(event: SubmitEvent) =>{
        event.preventDefault()

        try{
            const responce: Response = await Register(user)
            
            if (responce.status == 200){
                navigate('/login')
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
            minlength={6}
        />
    </FormGroup>

    <FormGroup floating label="Пароль">
        <Input 
            placeholder = "Введите пароль" 
            type="password" 
            required
            minlength={8}
            pattern = "[a-zA-Z0-9]*"
            bind:value={user.password}
        />
    </FormGroup>

    <FormGroup floating label="E-mail">
        <Input 
            placeholder = "Введите электронку"
            type="email"
            required
            bind:value={user.email}
        />
    </FormGroup>

    <Button type="submit" color="primary" on:click={() => validated = true}>
        Зарегистрироваться
    </Button>

    <Button type="button" on:click={() => navigate('/login')}>
        Перейти к авторизации
    </Button>
</Form>
    
<Alert isOpen={notificationOpened} dismissible fade color='primary'>Что то пошло не так!</Alert>
