const express = require("express");
const app = express();
const PORT = 5000;
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");

//Enviroment Variables
dotenv.config({
    path : "./config/env/config.env"
});
//sql connection

connectDatabase(process.env.USER,process.env.PASSWORD,process.env.SERVER,process.env.DATABASE);

// Express - Body Middleware
app.use(express.json());

//Routers Middleware

app.use("/api/",routers);
//çalıştırma
app.get("/",(req,res)=>{
    res.send("Transfer Api");
})


app.listen(PORT, ()=>{
    console.log(`App started on ${PORT} `);
})