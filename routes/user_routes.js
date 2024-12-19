const express = require("express")
const { UserModel } = require("../models/UserModel")
const salt = 5
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

userRouter.get("/", (req, res)=>{
    res.send("All users")
})

userRouter.post("/register", async(req, res)=>{
    const {name, email, password} = req.body
    bcrypt.hash(password, salt, async function(err, hash) {
        if(err)
            return res.send({message: "Something went wrong", status: 0})
        try
        {
            let data = await UserModel.find({email})
            if(data.length > 0)
            {
                res.send({
                    message: "Email already exists!",
                    status: 0
                })
            }
            else
            {
                let user = new UserModel({name, email, password: hash})
                await user.save()
                res.send({
                    message: "User created successfully",
                    status: 1
                })
            }
        }
        catch(error)
        {
            res.send({
                message: error.message,
                status: 0
            })
        }
    });
})



module.exports = {
    userRouter
}