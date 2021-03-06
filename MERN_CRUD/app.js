//BASIC LIBRARY IMPORT
const express=require('express')
const router=require('./src/routes/api')

const app=new express();
const bodyParser=require('body-parser');
const path=require('path')


//Security Middleware Import

const rateLimit=require('express-rate-limit')
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')
const hpp=require('hpp')
const xss=require('xss-clean')
//const cookieParser=require('cookie-parser')
const cors=require('cors')

//DATABASE LIBRARY IMPORT
const mongoose=require('mongoose')
app.use(express.static('client/build'))


//Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//app.use(cookieParser())

//BODY PARSER IMPLEMENT
app.use(bodyParser.json())

//Request Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000, // Limit each IP to 3000 requests per `window` (here, per 15 minutes)
})

app.use(limiter)

//MONGO DB DATABASE CONNECTION


let URI='mongodb+srv://<username>:<password>@cluster0.hx69h.mongodb.net/crud?retryWrites=true&w=majority';
let OPTION={user:'testuser123',  pass:'testuser123'}

mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connection Success")
    console.log(error)
});





// //UNDEFINED ROUTE
//
// app.route("*",(req,res)=>{
//     res.status(404).json({status:"Fail",data:"Not Found"})
// })

//Routing Implementation
app.use("/api/v1",router)

//ADD REACT FRONTEND ROUTING SCAFFOLDING
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

module.exports=app