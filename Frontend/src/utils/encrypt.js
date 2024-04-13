import CryptoJS from "crypto-js"; 
import * as routing from './routing.js'

export function  encryptMessages (messages,secret, selectedChat){
    const connectionBanner = routing.getUserConnection(messages,selectedChat)
    if (connectionBanner){
			connectionBanner.banner.map((message)=>{
				message.content=CryptoJS.AES.encrypt(message.content,secret).toString();
				console.log(message.content)
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
				var bytes=CryptoJS.AES.decrypt(message.content,secret);
				message.content=bytes.toString(CryptoJS.enc.Utf8);
				console.log(message.content)
			})
		}
};