import express from 'express'
import { Console } from 'node:console'
import {createServer} from 'node:http'
import {Server as SocketServer} from 'socket.io'
import * as asymmetric from './utils/asymetric.js'

const app = express() // manejador de solicitudes
const server = createServer(app) // creando un servidor HTTP con el manejador de solicitudes
//  creando servidor Socket.io
const io = new SocketServer(server) 

// To take control of connections
const routingTable = []
function connection(socketID,from,publicKey,privateKey){
    this.socketID = socketID
    this.from = from
		this.publicKey = publicKey
		this.privateKey = privateKey
}
function addConnection (table,socketID,from){
    table.push(new connection(socketID,from,'',''))
}

// Functions to check status of table
function checkConnection(table, from) {
    return table.some(user => user.from === from);
}
// Functions to find user
function findConnection(table,typeParameter,parameterMessage){
    switch(typeParameter){
        case 'from':
            return table.find(item => item.from === parameterMessage)
        case 'socketID':
            return table.find(item=> item.socketID === parameterMessage)
        default:
            console.log('you can only select sockedID or the from parameter')
    }
}


io.on("connection", (socket)=>{
	// prompt connection status
	console.log("\n-----------------------")
	console.log(`Client connected ID: ${socket.id}`)
	console.log("\n-----------------------")



	/*
			––––––––––––––––––->
			––––––––––––––––––->
			––––––––––––––––––->
			––––––––––––––––––->
	*/
	socket.on("GetKeys",()=>{
			console.log("TABLA---------->\n\r",routingTable)
			const receiver = findConnection(routingTable,'socketID',socket.id)
			console.log(`——————————— Busqueda ———————————\n\r—————————— ${socket.id} ———————————\n\r${JSON.stringify(receiver)}`)
			if(receiver !== undefined){
				routingTable.splice(routingTable.indexOf(receiver),1)
				const keys = asymmetric.generateKeyPair()
				routingTable.push(new connection(
					receiver.socketID,
					receiver.from,
					keys.publicKey,
					keys.privateKey
				))
			}
			console.log("TABLA   \n\n\r",routingTable)
			socket.emit("Keys",{ola:'diego',id:'ifvnfinv'})
	})








	// to remove user are not connected
	socket.on("disconnect",()=>{
			console.log(`Usuario desconectado ${socket.id}`)
			const receiver = findConnection(routingTable,'socketID',socket.id)
			console.log(receiver)
			if(receiver !== undefined){
					routingTable.splice(routingTable.indexOf(receiver),1)
					console.log(routingTable)
			}else{
					console.log("NO")
					console.log(routingTable)
			}
	})

	socket.on("Discover",(loggedUserName)=>{
			console.log("———— DISCOVER ————\n\r",loggedUserName)
			// to prevent identity theft
			if (!checkConnection(routingTable,loggedUserName)){
					socket.emit("LoggedUsers",routingTable)
					addConnection(routingTable,socket.id,loggedUserName,'','')
					socket.broadcast.emit("Broadcast Request",{
							socketID:socket.id,
							from: loggedUserName}
					)
			}else{
					console.log("Socket is now online")
			}
	})


	socket.on("Request",(messageIncomming)=>{
			console.log("———— Request & Response ————")
			// find socket.id to private message
			const receiver = findConnection(routingTable,'socketID',messageIncomming.from)
			if (receiver !== undefined) {
					console.log(`From: ${messageIncomming.from}\n\rTo:${receiver.from}\n\r${messageIncomming.content}\n\r-----------------------\n\n`)
					io.to(receiver.socketID).emit("Response",messageIncomming)
			}else{
					console.log(`Error ->  ${messageIncomming.from} not found\n`)
					console.log(routingTable)
			}
	})
})

server.listen(4000) 
console.log("Usuario Conectado",4000)
