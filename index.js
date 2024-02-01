import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
const app = express()
dotenv.config({
    path: './.env'
})

app.get('/', (req, res) => {
  res.status(200).json({
    message:"Welcome to the XPulse"
  });
})

connectDB().then(()=>{
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is listening on port ${process.env.PORT}`)
      })
}).catch(err =>{
    console.log("MONGO db connection error !!! ", err);
});
