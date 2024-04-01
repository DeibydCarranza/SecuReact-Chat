import express from 'express'
import {createServer} from 'node:http'
import {Server as SocketServer} from 'socket.io'

const app = express() // manejador de solicitudes
const server = createServer(app) // creando un servidor HTTP con el manejador de solicitudes
//  creando servidor Socket.io
const io = new SocketServer(server) 

io.on("connection", (socket)=>{
        console.log("\n-----------------------")
        console.log(`Client connected ID: ${socket.id}`)
        socket.on("Message",(messageIncomming)=>{
            console.log(`From: ${messageIncomming.from}\n\r${messageIncomming.content}\n\r${messageIncomming.time}\n\r-----------------------\n\n`)
        })
    })
server.listen(4000) 
console.log("Usuario Conectado",4000)
