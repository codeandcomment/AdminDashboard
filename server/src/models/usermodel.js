import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import db from '../database/db.js';
import { promisify } from 'util';

const queryAsync = promisify(db.query).bind(db); // Convert db.query to a Promise-based function

export const registerUser = async ({email,username,password}) =>{


    const SQL ='Insert into Users (email,username,password) VALUES (?,?,?)';
    const Values = [email,username,password]

    try {
        const result = await queryAsync(SQL, Values);
        console.log('res', result);
        return { message: result };
    } catch (err) {
        console.error(err);
        throw err; // Ensure errors are properly handled
    }
}



export const loginUser = async ({username,password}) =>{

    console.log(username,password);

    const SQL ='SELECT id,email FROM Users WHERE username=? AND password=?';
    const Values = [username,password]


    try {
        const result = await queryAsync(SQL, Values);
        console.log('res', result);
        if (result.length > 0) {
            const token = jwt.sign({ id: result[0].id, email: result[0].email,username:username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return {message:'success', id: result[0].id ,token:token}; // Extracting only the id
        } else {
            return { message: "User not found" };
        }
    } catch (err) {
        console.error(err);
        throw err; // Ensure errors are properly handled
    }
}

export const listUsers = async () =>{


    const SQL ='SELECT id,email,username FROM Users ';
    const Values = []


    try {
        const result = await queryAsync(SQL, Values);
        console.log('res', result);
        if (result.length > 0) {
            return {message:'success', result: result}; // Extracting only the id
        } else {
            return { message: "data not found" };
        }
    } catch (err) {
        console.error(err);
        throw err; // Ensure errors are properly handled
    }
}

