
const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/eyecamp"
 
const connectToMongo = () =>{
    mongoose.connect(process.env.MONGO_URI).then(
        ()=>{
            console.log("Conneted to mongo successfully");
        }
    ).catch(
        ()=>{
            console.log("Conneted to mongo failed");
        }
    );
}

module.exports= connectToMongo;