<script lang="ts">
    import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "@sveltestrap/sveltestrap";
    import { Link } from "svelte-routing";
 
    let isOpen = false

    const toggle = () => {
        isOpen = !isOpen
    }

    const links: [{path: string, title: string}] = [
        {
            path: '/dashboard/profile',
            title: 'Перейти в профиль'
        }
    ]


</script>

<Navbar color="dark" theme="dark">
    <NavbarBrand href="/">К главной</NavbarBrand>
    <NavbarToggler on:click={toggle} class="me-2"/>
    <Collapse {isOpen} navbar>
        <Nav navbar>
            {#each links as {path, title}}
                <NavItem>
                    <Link to={path} class="nav-link">{title}</Link>
                </NavItem>
            {/each}
        </Nav>
    </Collapse>
</Navbar>