import React, { useEffect , useState } from 'react'
import {fetchDepartments} from "../../utils/EmployeeHelper"
import axios from "axios"
import { useNavigate , useParams } from "react-router-dom"

const Edit = () => {
   const [employee, setEmployee] = useState({
      name : '',
      maritalStatus : '',
      designation : '',
      salary : 0,
      department : ''
   })
   const [departments, setDepartments] = useState(null)
   const navigate = useNavigate();
   const { id } = useParams()

   useEffect(() =>{
    const getDepartments = async () =>{ 
      const departments = await fetchDepartments()
      setDepartments(departments)
    };
    getDepartments()
 },[])
    
   useEffect(() =>{
    const fetchEmployee = async() =>{
      try{
        const response = await axios.get(`https://e-ms-ut2u.onrender.com/api/employee/${id}`,{
           headers : {
              "Authorization" : `Bearer ${localStorage.getItem('token')}`
           }
        })
        if(response.data.success){
          const employee = response.data.employee
          setEmployee((prev) => ({
              ...prev, 
              name: employee.userId.name,
              maritalStatus : employee.maritalStatus,
              designation : employee.designation,
              salary : employee.salary,
              department : employee.department 
          }))
        } 
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
   };
   fetchEmployee()
   },[])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEmployee((prevData) => ({...prevData, [name] : value}))
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
   
      try{
          const response = await axios.put(`https://e-ms-ut2u.onrender.com/api/employee/${id}`,employee,{
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.success){
            navigate("/admin-dashboard/employees")
          }
      }catch(error){
          if(error.response && !error.response.data.success){
              alert(error.response.data.error)
              console.log(error.message)
          }
      }

    }

  return (
    <>{departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                <select 
                  name="maritalStatus"
                  value={employee.maritalStatus}
                  onChange={handleChange}
                  placeholder="marital Status"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required>
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input 
                  type="text" 
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input 
                  type="number" 
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
            </div>

            
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select 
                  name="department"
                  onChange={handleChange}
                  value={employee.department}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required>
                  <option value="">Select Department</option>
                  {departments.map(dep =>(
                    <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                  ))}
                </select>
            </div>

          </div>

          <button 
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded">Edit Employee
          </button>
        </form>
      </div>

    ) : <div>Loading ...</div>}</>
    
  )
}

export default Edit

