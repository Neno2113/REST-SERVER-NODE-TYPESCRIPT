import dotenv from 'dotenv';
import dbConnection from './db/connection';
import Server from './models/server';

dotenv.config();


const server = new Server();

dbConnection();


server.listen();