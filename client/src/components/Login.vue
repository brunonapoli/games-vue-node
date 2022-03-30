<template>
    <div>
        EMAIL <input v-model="mail" type="text"> <br>
        CONTRASEÑA <input v-model="contraseña" type="text"> <br>
        <button @click="ingresar">INGRESAR</button>
        {{ error }}
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
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
                mail: this.mail, //PUEDO INGRESAR MISMOS USUARIOS, HAY UN ERROR
                contraseña: this.contraseña
            }
            axios.post('http://localhost:3030/login', usuario)
            .then(res => {
                console.log(res)
                this.$router.push('/game')
            }, err => {
                console.log(err)
                this.error = err.response.data.titulo
            })
        }
    }
}
</script>