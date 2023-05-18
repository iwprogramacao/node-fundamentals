// STREAMS

// Readable Streams -> process.stdin
// Writable Streams -> process.stdout

// process.stdin.pipe(process.stdout) -> Lê uma stream e encaminha para o .stdout
import { Readable, Writable, Transform } from 'node:stream'

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

// Ler dados
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

// Escrever dados
class MultiplyByTenStream extends Writable {
  // Chunk: buffer -> Pedaço que lemos da stream de leitura (this.push() do Readable)
  // Encoding -> Como essa info está codificada
  // Callback -> Função a ser chamada ao final dos métodos que irão trabalhar o chunk 
  // IMPORTANTE: Uma Writable não retorna nada, é apenas uma Consumer, processando o dado
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// Ler dados e escrever para outra Stream
class ChunkToAnotherStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * (-1)

    // 1º param -> Erro (caso não tenha dado erro no método, deve retornar nulo)
    // 2º param -> Chunk transformado
    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new ChunkToAnotherStream())
  .pipe(new MultiplyByTenStream())