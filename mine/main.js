export default {
    data() {
        return {
            game: ['tijera', 'papel', 'piedra'],
            eleccion: ['', ''],
            punto: 2,
            comentario: ''
            }
        },
    methods: {
        randomChoice(id) {
            setTimeout(() => {
                this.eleccion[0] = this.game[id]
                this.eleccion[1] = this.game[Math.floor(Math.random()*this.game.length)]
            }, 500);
            setTimeout(() => {
                this.eleccion[0] = ''
                this.eleccion[1] = ''
            }, 2000);
        },
        puntaje() {
            setTimeout(() => {
                if (this.eleccion[0] === 'tijera' && this.eleccion[1] === 'papel') {
                this.punto ++
                this.comentario = 'Has ganado un punto'
                setTimeout(() => {
                    this.comentario = ''
                }, 1000);
                }
                if (this.eleccion[0] === 'piedra' && this.eleccion[1] === 'tijera') {
                this.punto ++
                this.comentario = 'Has ganado un punto'
                setTimeout(() => {
                    this.comentario = ''
                }, 1000);
                }
                if (this.eleccion[0] === 'papel' && this.eleccion[1] === 'piedra') {
                this.punto ++
                this.comentario = 'Has ganado un punto'
                setTimeout(() => {
                    this.comentario = ''
                }, 1000);
                }
            }, 500);  
        }
    },
    template: `
    <div class="contador">
        <h1 v-if="punto < 3">CONTADOR: {{punto}}</h1>
        <h1 v-else>FELICITACIONES, HAS GANADO</h1>
    </div>
    <div class="button-games">
        <h2>Su elección: <p>{{eleccion[0]}}</p></h2>
        <button @click="randomChoice(0); puntaje();">{{game[0]}}</button>
        <button @click="randomChoice(1); puntaje();">{{game[1]}}</button>
        <button @click="randomChoice(2); puntaje();">{{game[2]}}</button>
    </div>

    <div class="button-ia">
        <h2>Elección de la máquina: <p>{{eleccion[1]}}</p></h2>
    </div>
    <div>
        <h3>{{comentario}}</h3>
    </div>
    `
}