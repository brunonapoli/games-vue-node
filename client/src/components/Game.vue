<template>
  <div id="app">
    <Navbar 
      :nombre="nombre"
      :jugadas="datos['Partidas jugadas']"
      :ganadas="datos['Partidas ganadas']"
      :perdidas="datos['Partidas perdidas']"
      :rondas="datos['Cantidad rondas']"
    />
    <b-card bg-variant="light" class="mx-auto" style="margin-top:8%; text-align:center">
      <!-- <h1>Usuario {{ nombre }}, mail {{ mail }}</h1> -->
      <div class="contador">
          <h1 v-if="punto['jugador'] < 3 && punto['maquina'] < 3"> 
            JUGADOR: {{punto['jugador']}} 
            - 
            MAQUINA: {{punto['maquina']}}</h1>
          <h1 v-else-if="punto['jugador'] == 3">¡FELICITACIONES, HAS GANADO!</h1>
          <h1 v-else>HAS PERDIDO LA PARTIDA</h1>
          <!-- <button  @click="reiniciar" v-if="punto['jugador'] == 3 || punto['maquina'] == 3">
            VOLVER A JUGAR
          </button> -->
      </div>
      
      <div class="elecciones">
        <b-row style="border-bottom: 50px">
          <b-col md="6">
            <h2>Su elección:</h2>
            <h2>{{eleccion[0]}}</h2>
          </b-col>
          <b-col md="6">
            <h2>Elección de la máquina:</h2>
            <h2>{{eleccion[1]}}</h2>
          </b-col>
        </b-row>
        <div class="botones">
          <b-button variant="primary" size="lg" @click="randomChoice(0); puntaje();">{{game[0]}}</b-button>
          <b-button variant="primary" size="lg" style="margin-left:50px" @click="randomChoice(1); puntaje();">{{game[1]}}</b-button>
          <b-button variant="primary" size="lg" style="margin-left:50px" @click="randomChoice(2); puntaje();">{{game[2]}}</b-button>
        </div>
      </div>
      <div>
        
        <!-- <button @click="verEstadisticas">VER ESTADÍSTICAS</button> <br> -->
        <ul v-if = "habilitar">
          <li v-for="(valor, key) in datos" :key="key">
            {{ key }}
            {{ valor }}
          </li>
        </ul>
        <!-- <button @click="logout">CERRAR SESIÓN</button> -->
      </div>
      <!-- <Footer /> -->
    </b-card>
    <b-card v-if="comentario" bg-variant="light" class="mx-auto" style="margin-top:4%; text-align:center">
      <h3>{{ comentario }}</h3>
    </b-card>

    <div class="pantalla" v-if="punto['jugador'] == 3 || punto['maquina'] == 3">
      <b-card class="centrado">
        <h2>LA PARTIDA HA TERMINADO</h2> <br>
        <h4 v-if="punto['maquina'] == 3">HA GANADO: LA MÁQUINA</h4>
        <h4 v-if="punto['jugador'] == 3">HA GANADO: {{nombre}}</h4>
        <h4>TOCA EN EL BOTÓN PARA VOLVER A JUGAR</h4> <br>
        <b-button variant="primary" size="lg" @click="reiniciar">
            VOLVER A JUGAR
        </b-button>
      </b-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

export default {
  name: 'Game',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      id: "",
      nombre: '',
      mail: '',
      game: ['TIJERA', 'PAPEL', 'PIEDRA'],
      datos: {
        'Partidas jugadas': 0,
        'Partidas ganadas': 0,
        'Partidas perdidas': 0,
        'Cantidad rondas': 0
      },
      eleccion: ['', ''], //[0] pertenece al jugador y [1] pertenece a la pc
      punto: {
        jugador: 0,
        maquina: 0
      },
      comentario: '',
      habilitar: false
    }
  },
  watch: {
    'punto.jugador': function() {
      this.comentario = 'HAS GANADO UN PUNTO'
      setTimeout(() => {
        this.comentario = '';
      }, 2000);
      if (this.punto['jugador'] === 3) {
        this.datos['Partidas jugadas'] ++;
        this.datos['Partidas ganadas'] ++;
      }
    },
    'punto.maquina': function() {
      this.comentario = 'LA MÁQUINA HA GANADO UN PUNTO'
      setTimeout(() => {
        this.comentario = '';
      }, 2000);
      if (this.punto['maquina'] === 3) {
        this.datos['Partidas jugadas'] ++;
        this.datos['Partidas perdidas'] ++;
      }
    }
  },
  methods: {
    randomChoice(id) {
      let random = Math.floor(Math.random()*this.game.length)
      setTimeout(() => {
        //Vue no deja cambiar el array porque sí.
        this.$set(this.eleccion, 0, this.game[id]);
        this.$set(this.eleccion, 1, this.game[random])
      }, 500);
      setTimeout(() => {
        this.$set(this.eleccion, 0, "")
        this.$set(this.eleccion, 1, "")
      }, 2500);
    },
    puntaje() {
      this.datos['Cantidad rondas'] ++;
      setTimeout(() => {
        if (this.eleccion[0] === 'TIJERA' && this.eleccion[1] === 'PAPEL') {
          this.punto['jugador'] ++;
        }
        else if (this.eleccion[0] === 'PIEDRA' && this.eleccion[1] === 'TIJERA') {
          this.punto['jugador'] ++;
        }
        else if (this.eleccion[0] === 'PAPEL' && this.eleccion[1] === 'PIEDRA') {
          this.punto['jugador'] ++;
        }
        else if (this.eleccion[0] === this.eleccion[1]) {
          this.comentario = 'EMPATE'
          setTimeout(() => {
            this.comentario = ''
          }, 2000);
        }
        else {
          this.punto['maquina'] ++;
        }
      }, 500);
    },
    reiniciar() {
      this.punto['jugador'] = 0
      this.punto['maquina'] = 0
      let datosActualizar = {
        id: this.id,
        datosJuego: {
          jugadas: this.datos['Partidas jugadas'],
          ganadas: this.datos['Partidas ganadas'],
          perdidas: this.datos['Partidas perdidas'],
          rondas: this.datos['Cantidad rondas']
        }
      }
      console.log(datosActualizar)
      axios.put('http://localhost:3030/update', datosActualizar);
      this.$router.go();
    },
    // logout() {
    //   localStorage.clear();
    //   this.$router.push('/')
    // },
    verEstadisticas() {
      this.habilitar = !this.habilitar
    }
  },
  mounted() {
    axios.get('http://localhost:3030/usuario', { headers: { token: localStorage.getItem('token') } })
    .then(res => {
      console.log(res.data.user)
      this.id = res.data.user.id
      this.nombre = res.data.user.usuario
      this.mail = res.data.user.mail
      this.datos['Partidas jugadas'] = res.data.user.datosJuego.jugadas
      this.datos['Partidas ganadas'] = res.data.user.datosJuego.ganadas
      this.datos['Partidas perdidas'] = res.data.user.datosJuego.perdidas
      this.datos['Cantidad rondas'] = res.data.user.datosJuego.rondas
    })
    .catch(e => {
      console.log(e);
    })
  },
  created() {
    if (localStorage.getItem('token') === null) {
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
}
</style>