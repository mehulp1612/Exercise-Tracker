const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser=require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



const uri = process.env.MONGO_URI;
//console.log(uri);

mongoose.connect(uri,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

   

connection=mongoose.connection;
try{
    connection.once('open',()=>{
    console.log(`MongoDB Connection established`);
});
}
catch(error){
    console.log(error);
}

const exerciseRouter=require('./routes/exercises.js');
const userRouter=require('./routes/user.js');

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`);

});

