<template>
  <div id="app">
    <h1>Usuario {{ nombre }}, mail {{ mail }}</h1>
    <div class="contador">
        <h1 v-if="punto['jugador'] < 3 && punto['maquina'] < 3"> 
          CONTADOR JUGADOR: {{punto['jugador']}} 
          - 
          CONTADOR MAQUINA: {{punto['maquina']}}</h1>
        <h1 v-else-if="punto['jugador'] == 3">¡FELICITACIONES, HAS GANADO!</h1>
        <h1 v-else>HAS PERDIDO LA PARTIDA</h1>
        <button  @click="reiniciar" v-if="punto['jugador'] == 3 || punto['maquina'] == 3">
          VOLVER A JUGAR
        </button>
    </div>
    <div class="button-games">
        <h2>Su elección: <p> {{eleccion[0]}} </p></h2>
        <button @click="randomChoice(0); puntaje();">{{game[0]}}</button>
        <button @click="randomChoice(1); puntaje();">{{game[1]}}</button>
        <button @click="randomChoice(2); puntaje();">{{game[2]}}</button>
    </div>

    <div class="button-ia">
        <h2>Elección de la máquina: <p> {{eleccion[1]}} </p></h2>
    </div>
    <div>
      <h1>{{ comentario }}</h1>
      <button @click="verEstadisticas">VER ESTADÍSTICAS</button> <br>
      <ul v-if = "habilitar">
        <li v-for="(valor, key) in datos" :key="key">
          {{ key }}
          {{ valor }}
        </li>
      </ul>
      <button @click="logout">CERRAR SESIÓN</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Game',
  data() {
    return {
      id: "",
      nombre: '',
      mail: '',
      game: ['tijera', 'papel', 'piedra'],
      datos: {
        'Partidas jugadas': 0,
        'Partidas ganadas': 0,
        'Partidas perdidas': 0,
        'Cantidad rondas': 0
      },
      eleccion: ['', ''], //[0] pertenece al jugador y [1] pertenece a la pc
      punto: {
        jugador: 2,
        maquina: 2
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
      }, 1500);
      if (this.punto['jugador'] === 3) {
        this.datos['Partidas jugadas'] ++;
        this.datos['Partidas ganadas'] ++;
      }
    },
    'punto.maquina': function() {
      this.comentario = 'LA MÁQUINA HA GANADO UN PUNTO'
      setTimeout(() => {
        this.comentario = '';
      }, 1500);
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
        console.log(this.eleccion)
      }, 500);
      setTimeout(() => {
        this.$set(this.eleccion, 0, "")
        this.$set(this.eleccion, 1, "")
      }, 2000);
    },
    puntaje() {
      this.datos['Cantidad rondas'] ++;
      setTimeout(() => {
        if (this.eleccion[0] === 'tijera' && this.eleccion[1] === 'papel') {
          this.punto['jugador'] ++;
        }
        else if (this.eleccion[0] === 'piedra' && this.eleccion[1] === 'tijera') {
          this.punto['jugador'] ++;
        }
        else if (this.eleccion[0] === 'papel' && this.eleccion[1] === 'piedra') {
          this.punto['jugador'] ++;
        }
        else if (this.eleccion[0] === this.eleccion[1]) {
          this.comentario = 'EMPATE'
          setTimeout(() => {
            this.comentario = ''
          }, 1500);
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
    logout() {
      localStorage.clear();
      this.$router.push('/')
    },
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