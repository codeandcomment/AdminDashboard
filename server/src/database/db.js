
import mysql from 'mysql'

const db = mysql.createConnection({

    user: 'root',
    host: '127.0.0.1',
    password:'',
    database:'admindashboard'
}) 

export default db;