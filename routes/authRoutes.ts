import { Router } from "express";
import { check } from "express-validator";
import { login, register, renewToken } from "../controllers/auth";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";




const router = Router();



router.post('/register', 
    [ 
        check('name', 'The Name is requuired').not().isEmpty(),
        check('surname', 'The Surname is requuired').not().isEmpty(),
        check('email', 'The email is not valid').isEmail().normalizeEmail(),
        check('password', 'The password is requuired').isLength({min: 6 }),
        validarCampos
    ],
    register    
)

router.post('/login', 
    [ 
        check('email', 'The email is not valid').isEmail().normalizeEmail(),
        check('password', 'The password is requuired').not().isEmpty(),
        validarCampos
    ],
    login    
)

router.get('/renew', validarJWT, renewToken);




export default router;