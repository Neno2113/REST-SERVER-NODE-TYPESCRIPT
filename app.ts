import dotenv from 'dotenv';
import Server from './src/server/server';

dotenv.config();


const server = new Server();

// dbConnection();


server.listen();