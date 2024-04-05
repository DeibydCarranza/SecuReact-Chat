import express from 'express'
import {createServer} from 'node:http'
import {Server as SocketServer} from 'socket.io'

const app = express() // manejador de solicitudes
const server = createServer(app) // creando un servidor HTTP con el manejador de solicitudes
//  creando servidor Socket.io
const io = new SocketServer(server) 

// To take control of connections
const routingTable = []
function connection(sockeID,from){
    this.sockeID = sockeID
    this.from = from
}
function addConnection (table,sockeID,from){
    table.push(new connection(sockeID,from))
}

// Functions to check status of table
function checkConnection(table, from) {
    return table.some(user => user.from === from);
}
// Functions to find user
function findConnection(table,from){
    return table.find(user => user.from === from)
}

io.on("connection", (socket)=>{
        // prompt connection status
        console.log("\n-----------------------")
        console.log(`Client connected ID: ${socket.id}`)
        console.log("\n-----------------------")

        socket.on("Discover",(messageDiscover)=>{
            console.log("———— DISCOVER ————")
            // to prevent identity theft
            if (!checkConnection(routingTable,messageDiscover.from)){
                addConnection(routingTable,socket.id,messageDiscover.from)
            }else{
                console.log("Socket is now online")
            }
        })


        socket.on("Request",(messageIncomming)=>{
            console.log("———— Request & Response ————")
            // find socket.id to private message
            const receiver = findConnection(routingTable,messageIncomming.from)
            
            if (receiver !== undefined) {
                console.log(`From: ${messageIncomming.from}\n\rTo:${receiver.from}\n\r${messageIncomming.content}\n\r-----------------------\n\n`)
                io.to(receiver.sockeID).emit("Response",messageIncomming)
            }else{
                console.log("Error -> SocketID not found\n")
                console.log(routingTable)
            }
        })
    })
server.listen(4000) 
console.log("Usuario Conectado",4000)
