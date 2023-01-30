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
mongoose.connect(`mongodb+srv://${process.env.DB_EMON_AHMED}:${process.env.DB_PASS}@cluster0.1uacied.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log(`database coonction is successfull`)
})

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
  });


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });