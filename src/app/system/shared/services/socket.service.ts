import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket: WebSocket;

    data: any;

    constructor() {
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.onopen = () => {
         console.log('Connection opened');
        };
        this.socket.onerror = (error) => {
          console.log(`Error code: ${error['message']}`);
        };
        this.socket.onclose = () => {
            console.log('Connection close');
        };
        this.socket.onmessage = (data) => {
            this.data = data.data;
        };
    }

    sendMessage(msg: string) {
        this.socket.send(msg);
    }
}