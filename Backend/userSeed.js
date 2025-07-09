import User from "./models/user.js"
import bcrypt from "bcryptjs"
import connectToDatabase from "./db/db.js"

const userRegister = async () => {
  connectToDatabase()
    try{
      const hashPassword = await bcrypt.hash("admin1",10)
      const newUser = new User({
        name : "Admin",
        email : "admin1@gmail.com",
        password : hashPassword,
        role : "admin",
      })
      await newUser.save()
    }
    catch(error){
      console.log(error);
    }
}

userRegister();