import { Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from "express-validator/src/base";


interface PayloadProps {
    uid?: string;
    name?: string;
    avatar?: string;
}


const validarJWT = ( req:Request, res:Response, next: () => void ) => {

    const token = req.header('x-token')

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid, name, avatar }:any = jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY!
        );
        
        req.uid = uid;
        req.name = name;
        req.avatar = avatar;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}



export default validarJWT;