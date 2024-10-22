const express = require("express");
const cors = require("cors");
const path = require("path")
require("./Connection/Connection")
const patientApi = require("./Routes/Patients")
const doctorApi = require("./Routes/Doctors")

const port = 8080

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../Front-End/dist')));

app.use("/patient" , patientApi)
app.use("/doctor" ,  doctorApi)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.listen(port ,()=>{
    console.log(`listening to the port ${port}`)
})