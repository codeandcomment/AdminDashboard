const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.listen(3002,()=>{
    console.log('serveris up');
})


const db = mysql.createConnection({

    user: 'root',
    host: '127.0.0.1',
    password:'',
    database:'admindashboard'
}) 


app.post('/register',(req,res)=>{
    console.log(req.body);
    const email = req.body.Email;
    const username = req.body.UserName;
    const password = req.body.Password


    const SQL ='Insert into Users (email,username,password) VALUES (?,?,?)';
    const Values = [email,username,password]

    db.query(SQL,Values,(err,result)=>{
        if(err){
            console.log(err);
            res.json(err);
        }else{
            console.log('success');
            res.json({message:'User created successfully'});
        }
    })
})

app.post('/login',(req,res)=>{
    console.log(req.body);
    const username = req.body.UserName;
    const password = req.body.Password


    const SQL ='SELECT id FROM Users WHERE username=? AND password=?';
    const Values = [username,password]

    db.query(SQL,Values,(err,result)=>{
        if(err){
            console.log(err);
            res.json(err);
        }else{
            console.log('success');
            res.json({message:result});
        }
    })
})