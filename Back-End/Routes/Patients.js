const express = require("express")
const router =  express.Router()
const connection = require("../Connection/Connection")

router.use(express.json())

//Get All Patient
router.get("/GetPatients" ,(req , res)=>{
    const sql = "SELECT * FROM patients"
    connection.query(sql , (err , data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

//Create Patient
router.post("/CreatePatient" , (req ,res) => {
    const  sql = "INSERT INTO patients (`Name`, `Age`, `Gender`, `Date` , `PhoneNumber`, `AppointedDoctor`) VALUES (?)";
    const values = [
        req.body.nameInput,
        req.body.ageInput,
        req.body.genderInput,
        req.body.dateInput,
        req.body.phoneNumberInput,
        req.body.appointedDoctorInput,
    ]
    connection.query(sql , [values], (err , data) => {
        if (err) return res.json(err);
        return res.json(data);
    }) 
})

//Delete Patient
router.delete("/DeletePatient/:id" , (req , res) => {
    const {id} = req.params
    const sql = "DELETE FROM patients WHERE id = ?";

    connection.query(sql , [id] , (err , data) => {
        if(err) return res.json(err);
        return res.json({ message: `Patient with ID ${id} deleted successfully` });
    })
})

//Get Patient By Id
router.get("/GetPatientId/:id" ,(req , res) => {
    const {id} = req.params
    const sql = "SELECT * FROM patients WHERE id = ?"

    connection.query(sql , [id] , (err , data) =>{
        if(err) throw res.json(err);
        return res.json(data)
    })
})

//Update Patient By Id
router.put("/UpdatePatient/:id" , (req , res) => {
    const {id} = req.params
    const values = [
        req.body.nameInput,
        req.body.ageInput,
        req.body.genderInput,
        req.body.dateInput,
        req.body.phoneNumberInput,
        req.body.appointedDoctorInput,
    ]
    const sql = "UPDATE patients SET Name = ? , Age = ? , Gender = ? , Date = ? , PhoneNumber = ? , AppointedDoctor = ? WHERE id = ?"

    connection.query(sql , [...values , id] , (err , data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Get Patient By Registration  Id 
router.get("/GetPatientByRegistrationDate/:date" , (req , res) => {
    const  {date} = req.params
    const sql = "SELECT * FROM patients WHERE Date = ?"

    connection.query(sql , [date] , (err , data) => {
        if(err) return res.json(err);
        if(data.length === 0){
            return res.json({message : "No Patient Found" })
        }
        return res.json(data);
    })

})

module.exports = router