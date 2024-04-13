export function checkUserConnection (routingTable, selectedChat){
    if (!routingTable && !Array.isArray(routingTable) && routingTable.length === 0)
        throw new Error ('routingTable is not valid parameter')
    if (!selectedChat || typeof selectedChat !== 'object'||Object.keys(selectedChat).length === 0)
        throw new Error ('selectedChat is not valid parameter ')
    const connection = routingTable.some(item => item.socketID === selectedChat.socketID)    

    return connection;
}

export function getUserConnection (routingTable, selectedChat){
    if (!routingTable && !Array.isArray(routingTable) && routingTable.length === 0)
        throw new Error ('routingTable is not valid parameter')
    if (!selectedChat || typeof selectedChat !== 'object'||Object.keys(selectedChat).length === 0)
        throw new Error ('selectedChat is not valid parameter ')
    const connection = routingTable.find(item => item.socketID === selectedChat.socketID)
    if(connection)
        return connection
    return null
}

export function updateConnection (routingTable,selectedChat) {
    let connection
		
  	try {connection = getUserConnection(routingTable,selectedChat)
    }catch (error) {console.log(error.message)}

    if(connection !== undefined){
        routingTable.splice(routingTable.indexOf(connection),1)
        return connection.banner
    }
		return null
}
