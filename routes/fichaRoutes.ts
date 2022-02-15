import { Router } from "express";
import { check } from "express-validator";
import { deleteFile, getFiles, save, updateFile } from "../controllers/ficha";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";


const router = Router();

router.use( validarJWT );

router.post('/save',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('author', 'The author is required').not().isEmpty(),
        check('description', 'The description is required').not().isEmpty(),
        check('fecha_pub', 'The date is required').not().isEmpty(),
        validarCampos
    ],
    save 
);


router.put('/:id',
    [
        check('id', 'The id is not valid').isMongoId(),
        check('title', 'The title is required').not().isEmpty(),
        check('author', 'The author is required').not().isEmpty(),
        check('description', 'The description is required').not().isEmpty(),
        check('fecha_pub', 'The date is required').not().isEmpty(),
        validarCampos
    ],
    updateFile 
);

router.delete('/:id', 
    [
        check('id', 'The id is not valid').isMongoId(), 
        validarCampos
    ], 
    deleteFile
);

router.get('/', getFiles)



export default router;