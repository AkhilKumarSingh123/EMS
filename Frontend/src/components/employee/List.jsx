// import React , { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import {columns, EmployeeButtons} from "../../utils/EmployeeHelper.jsx"
// import DataTable from "react-data-table-component"
// import axios from 'axios'

// const List = () => {
//   const [employees, setEmployees ] = useState()
//   const [empLoading, setEmpLoading] = useState(false)
//   const [filteredEmployee, setFilteredEmployees] = useState([])


//   useEffect(() =>{
//     const fetchEmployees = async () =>{
//       setEmpLoading(true)
//        try{
//          const response = await axios.get("https://e-ms-ut2u.onrender.com/api/employee",{
//             headers : {
//                Authorization : `Beared ${localStorage.getItem('token')}`
//             }
//          })
//          if(response.data.success){
//            let sno = 1;
//             const data  =  await response.data.employees.map((emp) =>(
//              {
//                _id          :  emp._id,
//                sno          :  sno++,
//                dep_name     :  emp.department.dep_name,
//                name         :  emp.userId.name,
//                dob          :  new Date(emp.dob).toLocaleDateString(),
//                profileImage :  <img width={40} className="rounded-full" src={`https://e-ms-ut2u.onrender.com/${emp.userId.profileImage}`}/>,
//                action       :  (<EmployeeButtons Id={emp._id}/>),
//              }  
//            ))
//            setEmployees(data); 
//            setFilteredEmployees(data)
//          }
//        }
//        catch(error){
//          if(error.response && !error.response.data.success){
//            alert(error.response.data.error)
//          }
//        }finally{
//            setEmpLoading(false)
//        }
//     };
//     fetchEmployees();
//   },[]);
  
//   const handleFilter = (e) =>{
//       const records = employees.filter((emp) =>(
//          emp.name.toLowerCase().includes(e.target.value.toLowerCase())
//       ))
//       setFilteredEmployees(records)
//   }

//   return (
//     <div className="p-6">
//         <div className="text-center">
//               <h3 className="text-2xl font-bold">Manage Employee</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input 
//                 type="text"
//                 placeholder="Search By Department Name" 
//                 className="px-4 py-0.5 border"
//                 onChange={handleFilter}/>
//             <Link 
//                 to="/admin-dashboard/add-employee" 
//                 className="px-4 py-1 bg-teal-600 rounded text-white">Add New Employee</Link>
//           </div>
//           <div className="mt-6">
//             <DataTable columns={columns} data={filteredEmployee} pagination/>
//           </div>
//     </div>
//   )
// }

// export default List






import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper.jsx"
import DataTable from "react-data-table-component"
import axios from 'axios'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get("https://e-ms-ut2u.onrender.com/api/employee", {
          headers: {
            Authorization: `Beared ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img width={40} className="rounded-full" src={`https://e-ms-ut2u.onrender.com/${emp.userId.profileImage}`} />,
              action: (<EmployeeButtons Id={emp._id} />),
              raw: emp,
            }
          ))
          setEmployees(data);
          setFilteredEmployees(data)
        }
      }
      catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmpLoading(false)
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-auto">
      <div className="text-center mb-4">
        <h3 className="text-xl sm:text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-1 border rounded w-full sm:w-1/2"
          onChange={handleFilter} />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 text-center bg-teal-600 rounded text-white w-full sm:w-auto">
          Add New Employee
        </Link>
      </div>

      <div className="mt-6 hidden sm:block">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          pagination
          responsive
          highlightOnHover
        />
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden mt-4 space-y-4">
        {filteredEmployee.map(emp => (
          <div key={emp._id} className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-4">
              <img
                src={`https://e-ms-ut2u.onrender.com/${emp.raw.userId.profileImage}`}
                alt="profile"
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <p className="font-semibold text-lg">{emp.name}</p>
                <p className="text-sm text-gray-500">{emp.dep_name}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p><span className="font-semibold">DOB:</span> {emp.dob}</p>
            </div>
            <div className="mt-3">
              {emp.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List



