// src/services/socket.js

import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // server

const socket = io(SOCKET_URL, {
  autoConnect: false, // manually control connection
  reconnection: true, // enable reconnection
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;
