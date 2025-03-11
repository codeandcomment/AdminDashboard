
import {registerUser,loginUser,listUsers} from '../models/usermodel.js'


export const registerController = async(req,res) =>{
    console.log(req);
    const email = req.body.Email;
    const username = req.body.UserName;
    const password = req.body.Password


    const response = await registerUser({email,username,password})
    res.status(200).json(response);
}


export const loginController = async(req,res) =>{
    const username = req.body.UserName;
    const password = req.body.Password

    const response = await loginUser({username,password})
    console.log(response);
    res.status(200).json(response);
}


export const listusersController = async(req,res) =>{


    const response = await listUsers()
    console.log(response);
    res.status(200).json(response);
}

