
export default class WSS {

    constructor(wss) {
        this.wss = wss;
        this.sessions = {};
     
        this.wss.on('connection', (ws) => {
            ws.on('message', async (message) => {
                let request = JSON.parse(message);
                
            });
        })
    }
}
