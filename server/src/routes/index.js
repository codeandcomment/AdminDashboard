import express from'express';
import userRouter from './v1/user.js'


const apirouter = new express.Router();


apirouter.use('/v1',userRouter)


export default apirouter;

