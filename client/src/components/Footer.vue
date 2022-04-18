<template>
    <div>
        <footer class="footer">
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">Piedra, Papel o Tijera</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                <em>USUARIO</em>
                            </template>
                            <b-dropdown-item href="/game">Perfil</b-dropdown-item>
                            <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer{
    padding-right: 2000px;
    position:fixed;
    bottom:0;
}
</style>