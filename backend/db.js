
const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/eyecamp"
 
const connectToMongo = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,  // Increase timeout to 30 seconds
        socketTimeoutMS: 30000   // Increase socket timeout
      }).then(
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