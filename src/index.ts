import { Server } from './server';
import './Models/index'
const server = new Server();

const { SERVER_PORT, app } = server;


app.listen(SERVER_PORT, () => {
    console.log('The application is running on the port:', SERVER_PORT)
})