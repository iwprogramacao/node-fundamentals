// STREAMS

// Readable Streams -> process.stdin
// Writable Streams -> process.stdout

// process.stdin.pipe(process.stdout) -> Lê uma stream e encaminha para o .stdout
import { Readable } from 'node:stream'

// class OneToHundredStream extends Readable {
//   index = 1
//   // Toda Readable precisa ter um método read()
//   _read() {
//     const i = this.index++

//     if (i > 100) {
//       // Método que faz com que a stream forneça as informações para quem está
//       // consumindo
//       this.push(null)
//     } else {
//       /** Uma Stream não pode simplesmente trabalhar o chunk (pedaço de dado que
//        * está sendo consumido/escrevendo) sendo um formato primitivo. Precisamos
//        * trabalhar com o formato de buffer
//        * -> Buffer.from(String(i)) recebe qual a informação que eu quero que seja transformada
//        * em buffer, e o primeiro argumento deve ser uma String
//       */
//       const buffer = Buffer.from(String(i))
    
//       this.push(buffer)
//     }
//   }
// }

// // Lê a stream e já tenta escrever no terminal
// new OneToHundredStream().pipe(process.stdout)


class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
      
        this.push(buffer)
      }
    }, 1000)
  }
}

new OneToHundredStream().pipe(process.stdout)