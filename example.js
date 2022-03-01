let connectButton = document.getElementById("connect");
let session = document.getElementById('session');
let socket;

connectButton.addEventListener('click',(event)=>{
    
    if(!socket) {
        socket = new WebSocket('ws://localhost:3000');

        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({session:session.value}));
        });

        socket.addEventListener('message', (event) => {
            //let message = JSON.parse(event.data);
            console.log(event.data);
        });

        connectButton.innerHTML = "Disconnect";

    } else {
        socket.close();

        socket = null;
        connectButton.innerHTML = "Connect";
   }
});

document.getElementById('send').addEventListener('click', (event=> {
    let message = document.getElementById('message').value;
    socket.send(JSON.stringify({
        session:session.value,
        message
    }));
}))
