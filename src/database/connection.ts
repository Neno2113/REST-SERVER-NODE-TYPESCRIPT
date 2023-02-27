import mongoose from "mongoose"

mongoose.set('strictQuery', false);

export class ConnectionDB {
    private dbUrl:string;

    constructor(){
        this.dbUrl = process.env.DBURL || "mongodb://localhost:27017/short-link";
    }


    async connectDB() {
        try {
            const connection = await mongoose.connect(this.dbUrl );

            console.log("Database Connected");
            return connection;
            
        } catch (error) {
            console.log(error)
            throw new Error('An error ocurred tryng to connect to the database.')
        }
    }


    // disconnectDb(){

    // }



}