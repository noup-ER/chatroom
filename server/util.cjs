function broadcast(clients,msg){
    clients.forEach(client=>{
        client.send(msg);
    })
}


module.exports = {
    broadcast
}