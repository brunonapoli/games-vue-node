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
            })
        }
    }
}
</script>