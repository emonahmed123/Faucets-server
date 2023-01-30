const express =require("express");
const app = express();
const mongoose = require('mongoose')
const cors= require("cors")

const port = process.env.PORT ||5000;
//middlewares 
;
app.use(express.json());
app.use(cors());


//routes 

const userRoute =require("./routes/user.route")


app.use('/api/v1/user',userRoute)

//databse

mongoose.connect('mongodb://localhost:27017/emon').then(()=>{
    console.log(`database coonction is successfull`)
})

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
  });


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });