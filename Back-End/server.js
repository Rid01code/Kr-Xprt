const express = require("express");
const cors = require("cors");
const path = require("path");
require("./Connection/Connection");
const patientApi = require("./Routes/Patients");
const doctorApi = require("./Routes/Doctors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../Front-End/dist')));

app.use("/patient", patientApi);
app.use("/doctor", doctorApi);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/dist/index.html'));
});

if (process.env.NODE_ENV !== 'production') {
    const port = 8080;
    app.listen(port, () => {
        console.log(`listening to the port ${port}`);
    });
}

module.exports = app;