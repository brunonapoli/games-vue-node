<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Piedra, Papel o Tijera</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template #button-content>
                            <em>USUARIO</em>
                        </template>
                        <b-dropdown-item @click="activar">Perfil</b-dropdown-item>
                        <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <!-- Pantalla para el PERFIL -->
        <div class="pantalla" v-if="activado">
            <b-card class="centrado">
                <h2>{{ nombre }}</h2>
                <div v-if="nombre != 'Aún no has iniciado sesión.'">
                    Cantidad de partidas jugadas: {{jugadas}} <br>
                    Cantidad de partidas ganadas: {{ganadas}} <br>
                    Cantidad de partidas perdidas: {{perdidas}} <br>
                    Cantidad de rondas jugadas: {{rondas}} <br>
                </div>
                <b-button variant="primary" size="lg" @click="activar">
                    CERRAR
                </b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['nombre', 'jugadas', 'ganadas', 'perdidas', 'rondas'],
    data() {
        return {
            activado: false
        }
    },
    methods: {
        activar() {
            this.activado = !this.activado
        },
        logout() {
            localStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.pantalla{
  position: absolute;
  background: rgb(44, 43, 43, .5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 90;
}
.centrado{
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
  border-radius: 10px;
  text-align: center;
  padding: 50px;
  z-index: 100;
}
</style>
