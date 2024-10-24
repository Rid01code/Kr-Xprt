const express = require("express");
const cors = require("cors");
const path = require("path");
require("./Connection/Connection");
const patientApi = require("./Routes/Patients");
const doctorApi = require("./Routes/Doctors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/patient", patientApi);
app.use("/doctor", doctorApi);

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.resolve(__dirname, "Front-End", "dist")));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "Front-End", "dist", "index.html"));
    });
}

if (process.env.NODE_ENV !== 'production') {
    const port = 8080;
    app.listen(port, () => {
        console.log(`listening to the port ${port}`);
    });
}

module.exports = app;