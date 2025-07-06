import mongoose from "mongoose"
import Employee from "./Employee.js"          ////////////////
import Salary from "./Salary.js"           //////////////
import Leave from "./Leave.js"                    ///////////////

const departmentSchema = new mongoose.Schema({
    dep_name : {
      type : String,
      required : true
    },
    description : {
      type : String
    },
    createAt : {
      type : Date,
      default : Date.now
    },
    updateAt : {
      type : Date,
      default : Date.now
    }
})

/* Middleware that delete all entry when Department is deleted... */

departmentSchema.pre("deleteOne",{document : true, query : false}, async function(next){
  try{
      const employees = await Employee.find({department : this._id})                           ///////////////////  comment
      const empIds = employees.map(emp => emp._id)

      await Employee.deleteMany({department : this._id})
      await Leave.deleteMany({employeeId : {$in : empIds}})
      await Salary.deleteMany({employeeId : {$in : empIds}})
      next()
  }catch(error){
      next(error)
  }
})

const Department = mongoose.model("Department",departmentSchema);

export default Department;