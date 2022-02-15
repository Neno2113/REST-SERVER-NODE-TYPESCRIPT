import { Request, Response } from "express";
import Fichas from "../models/Fichas";
import Likes from "../models/Likes";


export const addLike = async( req: Request, res:Response ) => {

    const { ficha } = req.body;
    const { body } = req;
    const { uid }:any = req;

    try {
        let like = await Likes.findOne( { ficha, user: uid } );

        if(like){
            return res.status(404).json({
                ok: false,
                msg: 'Este registro ya existe'
            })
        }

        const newLike = new Likes( body );
        newLike.user = uid;
        
        await newLike.save();

        //update ficha likes count +1

        const fichaUpdate = await Fichas.findById( ficha );
        fichaUpdate.likes =+ 1
        await fichaUpdate.save()

        return res.json({
            ok: true,
            like: newLike
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Comuniquese con el administrador'
        })
        
    }
}


export const removeLike = async( req: Request, res:Response ) => {

    const { ficha } = req.params;

    try {

        let like = await Likes.findOne( { ficha } );
        
        if(!like){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro ningun registro'
            })
        }
        
        const likeRemoved = await Likes.findOneAndDelete({ ficha });

        return res.json({
            ok: true,
            like: likeRemoved
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Comuniquese con el administrador'
        })
    }
}

export const getLikesCount = async( req: Request, res:Response ) => {

    // const { limite = 5, desde = 0 } = req.query;

    // const [ total, likes ] = await Promise.all([
    //     Likes.countDocuments( ),
    //     Likes.find()
    //         .populate('ficha')
    //         .populate('user', 'name surname')
    //         .skip( Number( desde ))
    //         .limit( Number( limite ))
    // ]);
    const likes = await Likes.aggregate([
        { "$group": { _id: "$ficha", count:{$sum:1}}}
    ])

    // let result =  likes.exec()
    return res.json({
        ok: true,
        // total,
        likes,
        // result
    })

}