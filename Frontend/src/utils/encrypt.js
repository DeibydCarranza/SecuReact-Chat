import CryptoJS from "crypto-js"; 
import * as routing from './routing.js'

export function  encryptMessages (messages,secret, selectedChat){
    const connectionBanner = routing.getUserConnection(messages,selectedChat)
    if (connectionBanner){
			connectionBanner.banner.map((message)=>{
				message.content.mensaje=CryptoJS.AES.encrypt(message.content.mensaje,secret).toString();
				console.log(message.content.mensaje)
			})
    }
};

export function  encryptMessage (secret,message){
	return message=CryptoJS.AES.encrypt(message,secret).toString();
}
export function decrypt (messages,secret,selectedChat){
		const connectionBanner = routing.getUserConnection(messages,selectedChat)
		console.log(connectionBanner.banner)
		if(connectionBanner){
			connectionBanner.banner.map((message)=>{
				var bytes=CryptoJS.AES.decrypt(message.content.mensaje,secret);
				message.content.mensaje=bytes.toString(CryptoJS.enc.Utf8);
				console.log(message.content.mensaje)
			})
		}
};
