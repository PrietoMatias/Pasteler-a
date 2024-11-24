import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI

const connection = async ()=>{
    try {
        await mongoose.connect(uri);
        console.log('Succesful connection to database');
    } catch (error) {
        console.log('Error to connect to database: ' + error);
        process.exit(1);
    }
}

export default connection;