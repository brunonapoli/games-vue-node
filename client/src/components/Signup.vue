<template>
  <div>
    <Navbar nombre="Aún no has iniciado sesión."/>
    <b-card bg-variant="light" class="mx-auto" style="width: 500px; margin-top:5%;">
      <b-form-group label="Ingrese su nombre de usuario:" label-for="input-usuario"> 
        <b-form-input id="input-mail" v-model="usuario" type="text" placeholder="Ingrese su nombre de usuario"></b-form-input> 
      </b-form-group>
      <b-form-group label="Ingrese su mail:" label-for="input-mail"> 
        <b-form-input id="input-mail" v-model="mail" type="text" placeholder="Ingrese su email"></b-form-input> 
      </b-form-group>
      <b-form-group label="Ingrese su contraseña:" label-for="input-contraseña"> 
        <b-form-input id="input-mail" v-model="contraseña" type="password" placeholder="Ingrese su contraseña"></b-form-input> 
      </b-form-group>
      <section class="row">
        <div class="mx-auto">
          <b-button-toolbar>
            <b-button-group class="mx-4">
              <b-button variant="success" @click="registrar">REGISTRARSE</b-button>
            </b-button-group>
            <b-button-group class="mx-4">
              <b-button variant="primary" @click="ingresar">INICIAR SESIÓN</b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>
      </section>
    </b-card>
    <b-card v-if="error" bg-variant="danger" class="mx-auto" style="width: 500px; margin-top:5%; text-align: center;">
      <h4>{{ error }}</h4>
    </b-card>
    {{ error }}
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

export default {
  name: 'Signup',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      usuario: '',
      mail: '',
      contraseña: '',
      error:''
    }
  },
  methods: {
    registrar() {
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
          setTimeout(() => {
            this.error = '';
          }, 1500);
        }
      )
    },
    ingresar() {
      this.$router.push('/');
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
