 const express = require("express")

 const router = express.Router()

 const {  register, signin, listOfStudent, dashboard, verified,sendMail} = require("../Controllers/user.controller")


 router.get("/", listOfStudent)

 router.post("/signup", register)

 router.post("/signin", signin)
//  router.get("/signin", signin)

 router.get('/dashboard', dashboard)
 router.get('/verifyUser', verified)
 router.get('/sendMail', sendMail)


 module.exports = router