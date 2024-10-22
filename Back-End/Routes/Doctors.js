const express = require("express")
const router = express.Router()
const connection =require("../Connection/Connection")
const uuid = require("uuid")

router.use(express.json())

//Get All Doctors
router.get("/GetAllDoctors", (req, res) => {
    const sql = "SELECT * FROM doctors"
    connection.query(sql , (err , data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

//Create Doctor
router.post("/CreateDoctor", (req, res) => {
    const doctorId =  uuid.v4()
    console.log(doctorId)

    const sql =  "INSERT INTO doctors (`Id` , `Name` , `PhoneNumber` , `Specialty`) VALUES (?)";
    const values = [
        doctorId,
        req.body.doctorNameInput,
        req.body.doctorPhoneNumberInput,
        req.body.doctorSpecialtyInput,
    ]

    connection.query(sql , [values] , (err ,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

//Get Doctor By Id
router.get("/GetDoctor/:id" , (req , res) => {
    const {id} = req.params
    const sql = "SELECT * FROM doctors WHERE id = ?"
    connection.query(sql , [id] , (err , data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

//Update Doctor 
router.put("/UpdateDoctor/:id" , (req , res) => {
    const {id} = req.params
    const values = [
        req.body.doctorNameInput,
        req.body.doctorPhoneNumberInput,
        req.body.doctorSpecialtyInput,
    ]
    const sql = "UPDATE doctors SET Name = ? , PhoneNumber = ? , Specialty = ? WHERE id  = ?"

    connection.query(sql , [...values , id] , (err , data) => {
        if(err) return res.json("Error")
            return res.json(data)
    })
})

//Delete patient
router.delete("/DeleteDoctor/:id" , (req ,res) => {
    const {id} = req.params
    const sql = "DELETE FROM doctors WHERE id = ?";

    connection.query(sql , [id] , (err , data) => {
        if(err) return res.json(err);
        return res.json(data)
})

})

module.exports = router