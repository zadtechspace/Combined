// import userModel from "../Models/user.model";

const userModel = require("../Models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()
const nodemailer = require("nodemailer") 

const secret = process.env.SECRET_KEY

// const ListOfStudent = (req,res)=>{

// }

const listOfStudent = (req, res) => {
    res.send(
        [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",
            },
            {
                "id": 3,
                "name": "Clementine Bauch",
                "username": "Samantha",
                "email": "Nathan@yesenia.net",
            }
        ]
    )
}

const register =(req,res)=>{
    
    let user = new userModel(req.body)
    user.save()
    .then((user)=>{
       console.log(user)
        res.send({message:"User saved", status: true})
        // console.log("Welcome")
    }).catch(()=>{
        console.log({message:"faied to Register"})
    })

   
  }

// const signin =(req,res)=>{
//     let {email, password} = req.body
   
//     userModel.findOne({email:email}).then((user)=>{
//         if(user){
//             console.log({message:"Login successfully", status:true})
//             console.log({message:"Login successfully", status:true})

//         }else{
//             console.log("Failed to sign in")
            
//         };
//     }).catch((err)=>{
//         console.log(err)
//     })

// }

const signin= async(req, res)=>{

    const {email, password} =req.body;

    let user;

try {
    user = await userModel.findOne({email: email})
} catch (error) {
    return new Error
}
if(!user){
     res.status(404).json({message:"Login credential not found"})
    console.log({message:"Login credential not found"})
}

const correctPassword = bcrypt.compareSync(password, user.password)

if(!correctPassword){
   
    res.status(401).json({message:"Incorrect password"});
    console.log({message:"Incorrect password"})
}else{
    const token = jwt.sign({user:user._id},secret, {expiresIn:"120"})

    res.status(200).json({message:"Login successfully", status:true, token:token})

    console.log({message:"Login successfully", status:true, token:token})
}
    

}


const dashboard = (req,res)=>{

    userModel.find().then((data)=>{
       res.send({data:data})
       console.log(data)
    })
}

const verified = (req,res)=>{
    console.log("verified")
  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token,secret, (err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log(result)
        res.send(result)
    }

  })
   
}

const sendMail = (req, res) => {  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let mailOptions = {
        from: process.env.EMAIL,
        to: "oppo159352@gmail.com", // list of receivers
        subject: "Welcome to the world of Zadtech", // Subject line
        text: "Hello world?", // plain text body
        // html: "<b>Hello world?</b>", // html body

    }

    transporter.sendMail(mailOptions).then((info) => {
        console.log(info)
        res.status(201).json({message: info.message})
    }).catch((err) => {
        console.log(err)
        res.status(200).json({message: err.message})
    })
}



module.exports ={listOfStudent, register,signin, dashboard,verified,sendMail}