import mongoose from 'mongoose';


const ConnectDb = async () =>{
    try{
        mongoose.connect(`${process.env.MONGO_URI}`+'/AtsSystem').then(()=>{
            return console.log('DB Connected');
        })
    }catch(err){
        console.error(err);
    }
}

export default ConnectDb;