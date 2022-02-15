import express, { Application } from "express";
import cors from 'cors';
import fichaRoutes from '../routes/fichaRoutes';
import likesRoutes from '../routes/likesRoutes';
import authRoutes from '../routes/authRoutes';


class Server {

    private app:Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        fichas: '/api/file',
        likes: '/api/like',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000'


        this.middlewares();

        this.routes();
    }

    middlewares(){
        //cors
        this.app.use( cors() )

        //body parsing
        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }


    routes(){

        this.app.use( this.apiPaths.auth, authRoutes )
        this.app.use( this.apiPaths.fichas, fichaRoutes)
        this.app.use( this.apiPaths.likes, likesRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
            
        })
    }
}


export default Server;