import express, { Application } from "express";
import cors from 'cors';
import { ConnectionDB } from '../database/connection';



class Server {

    private app:Application;
    private port: string;
    private db: ConnectionDB;


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000'
        this.db = new ConnectionDB();


        this.middlewares();

        this.routes();
    }

    middlewares(){
        //cors
        this.app.use( cors() )

        //body parsing
        this.app.use( express.json() );

    }


    routes(){

  
    }


    listen() {
        this.app.listen( this.port, async() => {
            console.log('Servidor corriendo en puerto ', this.port);


            await this.db.connectDB();
            
        })
    }
}


export default Server;