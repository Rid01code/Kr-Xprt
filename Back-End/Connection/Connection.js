const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12739775",
    password: "HFAtYUTs17",
    database: "sql12739775"
})

connection.connect((err)=>{
    if(err){
        console.log("Error connecting to the database" , err.stack);
        return
    }
    console.log('Connected to the database as id', connection.threadId);
})

module.exports = connection