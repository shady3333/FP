const express=require("express");
const morgan=require("morgan");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const fs=require("fs");
const cors=require("cors");
const expressValidator=require("express-validator");

dotenv.config();
const app=express();


//database
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
  console.log("DB CONNECTED");
})

mongoose.connection.on('error',err=>{
  console.log(`Db Connection error : ${err.message}`);
});


//routes


const authRoute=require("./routes/auth");
const userRoute=require("./routes/user");

//api docs
app.get("/",(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err){
      return res.status(400).json({error:err})
    }
    const docs=JSON.parse(data)
    res.json(docs)
  })
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


app.use("/",authRoute);
app.use("/",userRoute)

app.use((err,req,res,next)=>{
  if(err.name == "UnauthorizedError")
    res.status(401).json({error:"Unauthorized!"})
})
const port=process.env.PORT || 8080;
app.listen(port,()=>{
  console.log(`Port ${port} Connected`);
});
