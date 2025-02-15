require('dotenv').config();
const connectToMongo = require('./db');
const createUser= require('./routes/createUser');
const login= require('./routes/login');
const getUser = require('./routes/getUser.js')
const createPatient = require('./routes/createPatient')
const findPatient = require('./routes/FindPatient')
const findPatientList = require('./routes/FindPatientList')

const updatePatient = require('./routes/updatePatient')
const editPatient = require('./routes/editPatient')
const SendOTP = require('./routes/SendOTP')
const updatePassword = require('./routes/UpdateUser')
const checkUser = require('./routes/CheckUserExist')

const bodyParser = require("body-parser");


const cors= require('cors')

connectToMongo();


const express = require('express')
const app = express()
const port = 5000
app.use(cors({
  origin: ["https://deeptendu.github.io","http://localhost:3000"], // React app's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
  allowedHeaders: ['Content-Type', 'auth-token','Accept']
}));
app.use(bodyParser.json());
app.use(express.json())
app.post('/api/auth/createuser', createUser);
app.post('/api/auth/updateuser', updatePassword);
app.post('/api/auth/checkuser', checkUser);
app.post('/api/auth/login', login);
app.get('/api/auth/getuser', getUser);
app.post('/api/createpatient', createPatient);
app.get('/api/findpatient/:number', findPatient);
app.post('/api/updatepatient', updatePatient);
app.get('/api/findpatientlist/:number', findPatientList);
app.post('/api/editpatient', editPatient);
app.post('/api/sendotp', SendOTP);




app.listen(port, () => {
  console.log(`eyecamp app listening on port ${port}`)
})