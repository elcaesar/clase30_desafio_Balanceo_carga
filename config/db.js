const mongoose = require('mongoose')

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_CONN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}

module.exports = {
    dbConnection
}