<template>
    <div>
        EMAIL <input v-model="email" type="text"> <br>
        CONTRASEÑA <input v-model="contraseña" type="text"> <br>
        <button @click="ingresar">INGRESAR</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            contraseña: ''
        }
    },
    methods: {
        ingresar() {
            let usuario = {
                email = this.email,
                contraseña = this.contraseña
            }
            axios.post('http://localhost:3030/login', usuario)
            .then(res => {
                console.log(res)
            })
        }
    }
}
</script>