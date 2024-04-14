
export function waitAdvertise(socketClient,eventName) {
    return new Promise((resolve,reject)=>{
        const managmentEvent = (secret)=>{
            resolve(secret)
            socketClient.off(eventName,managmentEvent)
        }
        socketClient.on(eventName,managmentEvent)
    })
}
