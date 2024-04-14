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
function connection(socketID,from,publicKey,solicitFlag,secret){
    this.socketID = socketID
    this.from = from
		this.publicKey = publicKey
	this.solicitFlag = solicitFlag		// {flag,time}
	this.secret = secret
}
function addConnection (table,socketID,from, publicKey,secret){
    table.push(new connection(socketID,from,publicKey,{
		flag:false,time:''
	},secret))
}
function setSolicitFlag (table, sockedID,time){
	const connection = findConnection(table,'socketID',sockedID)
	if(connection && connection.solicitFlag.flag === false){
		connection.solicitFlag = {flag:true, time:time}
		routingTable.splice(routingTable.indexOf(connection),1)
		routingTable.push(connection)
	}
	console.log("SETSolicitFlag\n",routingTable)
}
function checkSolicitFlag(table,sockedID){
	const connection = findConnection(table,'socketID',sockedID)
	if(connection){
		return connection.solicitFlag
	}
}

function determineFirstSolicit(receiber,source){
	if(receiber.solicitFlag.time > source.solicitFlag.time){
		return source.secret
	}else{
		return receiber.secret
	}
}
function getSecretConversation(table,source,receiber){
	const receiberConnection = findConnection(table,'socketID',receiber)
	const sourceConnection = findConnection(table,'socketID',source)
	// if you are the only one that solicit the conversation
	if(receiberConnection && receiberConnection.solicitFlag.flag === false){
		console.log("La tuya")
		return sourceConnection.secret
	}else if(receiberConnection && receiberConnection.solicitFlag.flag === true){
		console.log("La de él")
		return determineFirstSolicit(receiberConnection,sourceConnection)
	}
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
			const keys = asymmetric.generateKeyPair()
			console.log(keys)
			socket.emit("Keys",keys)
	})





	// to remove user are not connected
	socket.on("disconnect",()=>{
			console.log(`Usuario desconectado ${socket.id}`)
			const receiver = findConnection(routingTable,'socketID',socket.id)
			console.log(receiver)
			if(receiver !== undefined){
					routingTable.splice(routingTable.indexOf(receiver),1)
			}else{
					console.log("NO")
			}
	})

	socket.on("Discover",(loggedUserName)=>{
			console.log("———— DISCOVER ————\n\r",loggedUserName) // loggedUserName = {userName, publicKey, secret}
			// to prevent identity theft
			if (!checkConnection(routingTable,loggedUserName.userName)){
					socket.emit("LoggedUsers",routingTable)
					addConnection(routingTable,socket.id,loggedUserName.userName,loggedUserName.publicKey,loggedUserName.secret)
					socket.broadcast.emit("Broadcast Request",{
							socketID:socket.id,
							from: loggedUserName.userName,
							publicKey: loggedUserName.publicKey}
					)
					console.log(routingTable)
			}else{
					console.log("Socket is now online")
			}
	})


	socket.on("Request",(messageIncomming)=>{
			console.log("———— Request & Response ————")
			// find socket.id to private message
			const receiver = findConnection(routingTable,'socketID',messageIncomming.from)
			console.log("Request: ",receiver)
			if (receiver !== undefined) {
					console.log(`From: ${socket.id}\n\rTo:${receiver.from}\n\r${messageIncomming.content}\n\r-----------------------\n\n`)
					console.log("To: ",receiver.socketID)
					console.log("–——————————————————————————————")
					io.to(receiver.socketID).emit("Response",messageIncomming)
			}else{
					console.log(`Error ->  ${messageIncomming.from} not found\n`)
			}
	})

	socket.on("SOLICIT", (socketReceiber)=>{
		const time = new Date()
		setSolicitFlag(routingTable,socket.id,time)
		const secret = getSecretConversation(routingTable,socket.id,socketReceiber)
		console.log(`<----Solicit----   ${socket.id}\n\r --${secret}-->`)
		socket.emit("ADVERTISE",secret)
	})
})

server.listen(4000) 
console.log("Usuario Conectado",4000)
