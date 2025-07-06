import React , { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from "react-data-table-component"
import {columns, DepartmentButtons} from "../../utils/DepartmentHelper.jsx"
import axios from "axios"

const DepartmentList = () => {               ///////////////////////    req, res
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filterDepartments , setFilterDepartments] = useState([])

  // const onDepartmentDelete = async (id) => {
  //   const data = departments.filter(dep => dep._id !== id)
  //   setDepartments(data)
  //   // fetchDepartments()
  //   // setFilterDepartments(data)
  // }
  const onDepartmentDelete = () => {

    // setDepartments(data)
    fetchDepartments()
    // setFilterDepartments(data)
  }
  const fetchDepartments = async () =>{
    setDepLoading(true)
      try{
        const response = await axios.get("http://localhost:5000/api/department",{
            headers : {
              "Authorization" : `Beared ${localStorage.getItem('token')}`
            }
        })
        if(response.data.success){
          let sno = 1;
          const data = await response.data.departments.map((dep) =>(
            {
              _id : dep._id,
              sno : sno++,
              dep_name : dep.dep_name,
              action : (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
            }  
          ))
          setDepartments(data); 
          setFilterDepartments(data)
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }finally{
          setDepLoading(false)
      }
   };
  
  useEffect(() =>{
    //  const fetchDepartments = async() =>{
    //   setDepLoading(true)
    //     try{
    //       const response = await axios.get("http://localhost:5000/api/department",{
    //          headers : {
    //             "Authorization" : `Beared ${localStorage.getItem('token')}`
    //          }
    //       })
    //       if(response.data.success){
    //         let sno = 1;
    //          const data = await response.data.departments.map((dep) =>(
    //           {
    //             _id : dep._id,
    //             sno : sno++,
    //             dep_name : dep.dep_name,
    //             action : (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
    //           }  
    //         ))
    //         setDepartments(data); 
    //         setFilterDepartments(data)
    //       }
    //     }
    //     catch(error){
    //       if(error.response && !error.response.data.success){
    //         alert(error.response.data.error)
    //       }
    //     }finally{
    //         setDepLoading(false)
    //     }
    //  };
     fetchDepartments();
  },[])

  //  filter department by name ... in Department dashboard ...........
  const filterDepartment = (e) =>{
     const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))

     setFilterDepartments(records)
  }
  return (
    <>{depLoading ? <div>Loading....</div> :
        <div className="p-5">
          <div className="text-center">
              <h3 className="text-2xl font-bold">Manage Department</h3>
          </div>
          <div className="flex justify-between items-center">
            <input 
                type="text"
                placeholder="Search By Department Name" 
                className="px-4 py-0.5 border"
                onChange={filterDepartment}/>
            <Link 
                to="/admin-dashboard/add-department" 
                className="px-4 py-1 bg-teal-600 rounded text-white">Add New Department</Link>
          </div>
          <div className={"mt-5"}>
              <DataTable
                  columns = {columns} data={filterDepartments} pagination/>
          </div>
        </div>
    }</>    
  )
}

export default DepartmentList
