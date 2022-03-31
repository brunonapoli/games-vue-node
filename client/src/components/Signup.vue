<template>
  <div>
    USUARIO<input v-model="usuario" type="text"> <br>
    MAIL<input v-model="mail" type="text"> <br>
    CONTRASEÑA<input v-model="contraseña" type="password"> <br>
    <button @click="ingresar">Enviar</button> <br>
    {{ error }}
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'Signup',
  data() {
    return {
      usuario: '',
      mail: '',
      contraseña: '',
      error:''
    }
  },
  methods: {
    ingresar() {
      let nuevoUsuario = {
        usuario: this.usuario, 
        mail: this.mail, 
        contraseña: this.contraseña
      };
      console.log(nuevoUsuario)
      axios.post('http://localhost:3030/signup', nuevoUsuario)
        .then(res => {
          console.log(res)
          this.$router.push('/')
        }, error => {
          console.log(error.response)
          this.error = error.response.data.titulo
        }
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
