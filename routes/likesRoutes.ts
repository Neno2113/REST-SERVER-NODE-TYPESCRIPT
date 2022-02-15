import { Router } from "express";
import { check } from "express-validator";
import { addLike, getLikesCount, removeLike } from "../controllers/likes";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";



const router = Router();

router.use( validarJWT );

router.post('/add',
    [
        check('ficha', 'Is not a valid id').isMongoId(),
        validarCampos
    ], 
    addLike
);


router.post('/remove/:ficha',
    [
        check('ficha', 'Is not a valid id').isMongoId(),
        validarCampos
    ], 
    removeLike
);


router.get('/', getLikesCount)

export default router;