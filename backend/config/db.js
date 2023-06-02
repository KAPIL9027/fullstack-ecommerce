import mongoose from 'mongoose';

const connection = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${conn.connection.host}`);
    
    }
    catch(e){
        console.log(`Error: ${e.message}`);
        process.exit(1);
    }
    
}

export default connection;