import jwt from 'jsonwebtoken';


const generateJWT = ( uid:string, name:string, avatar:string  ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name, avatar };

        jwt.sign( payload, process.env.JWT_PRIVATE_KEY!, {
            expiresIn: '2h'
        }, ( err, token )=> {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }

            resolve( token );
                
        })

    })
}


export default generateJWT;