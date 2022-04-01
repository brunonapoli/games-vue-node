<template>
  <div id="app">
    <div class="contador">
        <h1 v-if="punto < 3"> CONTADOR: {{punto}}</h1>
        <h1 v-else>¡FELICITACIONES, HAS GANADO!</h1>
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
      <h3>{{comentario}}</h3> <br>
      <h1>Usuario {{ nombre }}, mail {{ mail }}</h1>
      <ul>
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
      nombre: '',
      mail: '',
      game: ['tijera', 'papel', 'piedra'],
      datos: {
        'Partidas jugadas:': 0,
        'Partidas ganadas:': 0,
        'Partidas perdidas:': 0,
        'Cantidad rondas:': 0
      },
      eleccion: ['', ''],
      punto: 0,
      comentario: ''
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
      setTimeout(() => {
        if (this.eleccion[0] === 'tijera' && this.eleccion[1] === 'papel') {
          this.punto ++;
          this.comentario = 'Has ganado un punto';
          setTimeout(() => {
            this.comentario = '';
          }, 1000);
        }
        if (this.eleccion[0] === 'piedra' && this.eleccion[1] === 'tijera') {
          this.punto ++;
          this.comentario = 'Has ganado un punto';
          setTimeout(() => {
            this.comentario = '';
          }, 1000);
        }
        if (this.eleccion[0] === 'papel' && this.eleccion[1] === 'piedra') {
          this.punto ++;
          this.comentario = 'Has ganado un punto';
          setTimeout(() => {
            this.comentario = '';
          }, 1000);
        }
      }, 500);  
    },
    logout() {
      localStorage.clear();
      this.$router.push('/')
    }
  },
  mounted() {
    axios.get('http://localhost:3030/usuario', { headers: { token: localStorage.getItem('token') } })
    .then(res => {
      this.nombre = res.data.user.nombre
      this.mail = res.data.user.mail
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