<template>
  <div>
    <Navbar nombre="Aún no has iniciado sesión."/>
    <b-card bg-variant="light" class="mx-auto" style="width: 500px; margin-top:2%">
      <h2 style="text-align: center; margin-bottom: 5%;">Cree su usuario</h2>

      <b-form-group label="Ingrese su nombre de usuario" label-for="input-usuario"> 
        <b-form-input id="input-mail" v-model="usuario" type="text" placeholder="Ingrese su nombre de usuario"></b-form-input> 
        <p class="error" v-if="errorUsuario" style="text-align: center; margin-top: 1%">{{errorUsuario}}</p>
      </b-form-group>

      <b-form-group label="Ingrese su mail" label-for="input-mail"> 
        <b-form-input id="input-mail" v-model="mail" type="text" placeholder="Ingrese su email"></b-form-input>
        <p class="error" v-if="error" style="text-align: center; margin-top: 1%">Este usuario ya existe</p>
        <p class="error" v-if="errorMail" style="text-align: center; margin-top: 1%">{{errorMail}}</p>
      </b-form-group>

      <b-form-group label="Ingrese su contraseña" label-for="input-contraseña"> 
        <b-form-input id="input-mail" v-model="contraseña" type="password" placeholder="Ingrese su contraseña"></b-form-input> 
        <p class="error" v-if="errorContraseña"> {{errorContraseña}}</p>
      </b-form-group>

      <b-form-group label="Ingrese nuevamente su contraseña" label-for="input-repetirContraseña"> 
        <b-form-input id="input-mail" v-model="repetirContraseña" type="password" placeholder="Ingrese nuevamente su contraseña"></b-form-input> 
        <p class="error" v-if="contraseña != repetirContraseña"> {{errorContraseña}}</p>
      </b-form-group>

      <section class="row">
        <div class="mx-auto" style="margin-top:1%">
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
      errorUsuario: '',
      mail: '',
      errorMail: '',
      contraseña: '',
      errorContraseña: '',
      repetirContraseña: '',
      error:''
    }
  },
  methods: {
    errorPass() {
      if (this.contraseña.length < 5) {
        this.contraseña = ''
        this.errorContraseña = 'Su contraseña debe tener al menos 5 letras/dígitos'
        setTimeout(() => {
          this.errorContraseña = '';
        }, 1500);
        return false
      }
      if (this.contraseña != this.repetirContraseña) {
        this.contraseña = ''
        this.errorContraseña = "Las contraseñas no coinciden"
        setTimeout(() => {
          this.errorContraseña = '';
        }, 1500);
        return false
      }
      return true
    },
    errorMailUsuario() {
      if (this.usuario.length <= 3) {
        this.errorUsuario = "El nombre del usuario debe contener al menos 4 letras/dígitos"
        setTimeout(() => {
          this.errorUsuario = '';
        }, 1500);
        return false
      }
      if (this.mail.includes('@') === false || this.mail.includes('.com') === false) {
        this.errorMail = "Mail no reconocido"
        setTimeout(() => {
          this.errorMail = '';
        }, 1500);
        return false
      }
      return true
    },
    registrar() {
      let errorDeContraseña = this.errorPass();
      let errorDeUsuario = this.errorMailUsuario();
      if (errorDeContraseña != false && errorDeUsuario != false) {
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
      }
      // if (this.contraseña != this.repetirContraseña) {
      //   this.errorContraseña = "Las contraseñas no coinciden"
      //   setTimeout(() => {
      //     this.errorContraseña = '';
      //   }, 1500);
      // }
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
.error{
  text-align: center; 
  margin-top: 10px; 
  color: rgb(255, 0, 0);
}
</style>
