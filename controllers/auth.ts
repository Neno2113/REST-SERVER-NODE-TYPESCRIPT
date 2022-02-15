import { Request, Response } from "express";
import User from "../models/User";
import bcrypt  from 'bcryptjs';
import generateJWT from "../helpers/jwt";


export const register = async( req:Request, res:Response ) => {

    const { email, password} = req.body;

    try {
        let user = await User.findOne({ email })

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'The user already exists'
            })
        }

        const newUser = new User( req.body );

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt );

        await newUser.save();


        // Generar JWT para el Login after register
        const token = await generateJWT( user.id, user.name, user.avatar ); 

        return res.status(201).json({
            ok: true,
            uid: newUser._id,
            name: newUser.name + newUser.surname,
            avatar: newUser.avatar,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Comuniquese con el administrador'
        })
        
    }

}


export const login = async( req:Request, res:Response ) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(404).json({
                ok: false,
                msg: 'Email or password incorrect'
            })
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Email or password incorrect'
            })
        }

        // Generar JWT para el Login after register
        const token = await generateJWT( user.id, user.name, user.avatar ); 

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Comuniquese con el administrador'
        })
    }
}


export const renewToken = async( req:any, res:Response ) => {

    const { uid, name, avatar } = req;

    const token = await generateJWT( uid, name, avatar ); 

    return res.json({
        ok: true,
        uid,
        name,
        avatar,
        token
    })
} 