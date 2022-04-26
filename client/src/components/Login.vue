<template>
    <div>
        <Navbar nombre="Aún no has iniciado sesión."/>
        <b-card bg-variant="light" class="mx-auto" style="width: 500px; margin-top:5%;">
            <b-form-group label="Ingrese su mail:" label-for="input-mail">
                <b-form-input id="input-mail" v-model="mail" type="email" placeholder="Ingrese su email" required> </b-form-input>
            </b-form-group>
            <b-form-group label="Ingrese su contraseña:" label-for="input-contraseña">
                <b-form-input id="input-contraseña" v-model="contraseña" type="password" placeholder="Ingrese su contraseña"> </b-form-input>
            </b-form-group>
            <section class="row">
                <div class="mx-auto">
                    <b-button-toolbar>
                        <b-button-group class="mx-4">
                            <b-button variant="success" @click="ingresar">INGRESAR</b-button>
                        </b-button-group>
                        <b-button-group class="mx-4">
                            <b-button variant="primary" @click="crearUsuario">CREAR USUARIO</b-button>
                        </b-button-group>
                    </b-button-toolbar>
                </div>
            </section>
        </b-card>
        <b-card v-if="error" bg-variant="danger" class="mx-auto" style="width: 500px; margin-top:5%; text-align: center;">
            <h4>{{ error }}</h4>
        </b-card>
        <Footer />
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

export default {
    name: 'Login',
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            mail: '',
            contraseña: '',
            error: ''
        }
    },
    methods: {
        ingresar() {
            let usuario = {
                mail: this.mail,
                contraseña: this.contraseña
            }
            axios.post('http://localhost:3030/login', usuario)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    this.$router.push('/game')
                }
            }, err => {
                console.log(err.response)
                this.error = err.response.data.titulo
                setTimeout(() => {
                    this.error = '';
                }, 2000);
            })
        },
        crearUsuario() {
            this.$router.push('/signup');
        }
    }
}
</script>

<style scoped>

</style>