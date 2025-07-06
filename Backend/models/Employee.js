import mongoose from "mongoose"
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId : {
      type : Schema.Types.ObjectId,
      ref : "User",
      required : true
    },
    employeeId : {                           
      type : String,
      required : true,                         
      unique : true,
      
    },
    dob : {
      type : Date
    },
    gender : {
      type : String
    }, 
    maritalStatus: {
      type: String,
      enum: ["single", "married"], // Valid status
      required: true,
    },
    designation : {
      type : String
    }, 
    department : {
      type : Schema.Types.ObjectId,
      ref : "Department",
      required : true
    },
    salary : {
      type : Number,
      required : true
    },
    createAt : {
      type : Date,
      default : Date.now
    },
    updateAt : {
      type : Date,
      default : Date.now
    },
})

const Employee = mongoose.model("Employee",employeeSchema);

export default Employee;