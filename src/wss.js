
export default class WSS {

    constructor(wss) {
        this.wss = wss;
        this.sessions = {};
     
        this.wss.on('connection', (ws) => {
            ws.on('message', async (message) => {
                let request = JSON.parse(message);

                if(!request.session) {
                    return;
                }

                if(!this.sessions[request.session]) {
                    this.sessions[request.session] = [];
                }

                const session = this.sessions[request.session];
                let me = session.indexOf(ws);
                if(!session.includes(ws)) {
                    session.push(ws);
                    session.forEach(peer => {
                        peer.send(JSON.stringify({
                            size: session.length
                        }));
                    })
                }

                if(request.message) {
                    session.forEach(peer => {
                        if(peer != ws) {
                            peer.send(JSON.stringify({
                                message: request.message
                            }));
                        }
                    })
                }
            });

            ws.on('close',() => {
                for(let i in this.sessions) {
                    const session = this.sessions[i];
                    if(session.includes(ws)) {
                        session.splice(session.findIndex(ws),1);

                        if(session.length) {
                            session.forEach(peer => {
                                peer.send(JSON.stringify({
                                    size: session.length
                                }));
                            })
                        } else {
                            delete this.sessions[i];
                        }
                    }
                }
            });
        })
    }
}
