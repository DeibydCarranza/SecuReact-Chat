import CryptoJS from "crypto-js"; 
import * as routing from './routing.js'

export function  encrypt (messages,secret, selectedChat){
	console.log("mi selectedChat",selectedChat)
    const connectionBanner = routing.getUserConnection(messages,selectedChat)
		console.log("*******",Object.keys(connectionBanner))
    if (connectionBanner){
			connectionBanner.banner.map((message)=>{
				message.content=CryptoJS.AES.encrypt(message.content,secret).toString();
				console.log(message.content)
			})
    }
};

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