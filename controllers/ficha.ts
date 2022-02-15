import { Request, Response } from 'express';
import Ficha from '../models/Fichas';
import Likes from '../models/Likes';


export const save = async(req: Request, res: Response) => {

    const { title } = req.body
    const { uid }:any = req

    try {
        let fileCreated = await Ficha.findOne({ title });

        if( fileCreated ){
            return res.status(400).json({
                ok: false, 
                msg: 'File already exists!!'
            })
        }
        // console.log(req.body);
        
        const fileNew = new Ficha( req.body );
        fileNew.user = uid;
        await fileNew.save();

        return res.status(201).json({
            ok: true,
            ficha: fileNew,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        })
        
    }
}


export const getFiles = async(req: Request, res: Response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, files ] = await Promise.all([
        Ficha.countDocuments( ),
        Ficha.find()
            .populate('user', 'name surname')
            .skip( Number( desde ))
            .limit( Number( limite ))
    ]);

    return res.json({
        ok: true,
        total,
        files
    })
}


export const updateFile = async( req: Request, res: Response ) => {

    const { id } = req.params
    const { body } = req;

    try {
        let file = await Ficha.findById( id );
        if( !file ){
            return res.status(404).json({
                ok: false,
                msg: `No existe una ficha con este id ${ id }`
            })
        }

        const fileUpdated = await Ficha.findByIdAndUpdate(id, body, { returnOriginal: false });
        
        return res.json({
            ok: true,
            file: fileUpdated
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        })
        
    }

}


export const deleteFile = async( req: Request, res: Response) => {

    const { id } = req.params;

    try {
        let file = await Ficha.findById( id );

        if(!file ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una ficha con este id ' + id
            })
        }

        const [ like, ficha ] = await Promise.all([
            Likes.findOneAndDelete({ ficha: id }),
            Ficha.findByIdAndDelete( id )

        ]);

        return res.json({
            ok: true,
            file: ficha,
            like
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        })
    }

  

}