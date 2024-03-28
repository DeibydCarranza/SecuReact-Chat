import express from 'express'
import {createServer} from 'node:http'
import {Server as SocketServer} from 'socket.io'

const app = express() // manejador de solicitudes
const server = createServer(app) // creando un servidor HTTP con el manejador de solicitudes
//  creando servidor Socket.io
const io = new SocketServer(server) 

io.on("connection", 
    (socket)=>{
        console.log("Client connected on port 5173")
    })
server.listen(4000) 
console.log("Usuario Conectado",4000)
