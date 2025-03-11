

import express from'express';
import cors from 'cors';
import apirouter from './src/routes/index.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.options('*', cors());


app.use('/api',apirouter)


app.listen(3002,()=>{
    console.log('serveris up');
})


