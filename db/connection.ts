import mongoose from 'mongoose';



const dbConnection = () => {


    try {
        mongoose.connect( process.env.DB_CNN! );
        console.log("Conexion exitosa");
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}



export default dbConnection;