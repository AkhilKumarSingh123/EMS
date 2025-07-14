// import React, {useEffect, useState} from 'react'
// import DataTable from "react-data-table-component"
// import {columns, LeaveButtons} from "../../utils/LeaveHelper"
// import axios from "axios"

// const Table = () => {
//   const [leaves, setLeaves] = useState()
//   const [filteredLeaves, setFilteredLeaves] = useState(null)

//   const fetchLeaves = async () =>{
//     try{
//       const response = await axios.get("https://e-ms-ut2u.onrender.com/api/leave",{          
//          headers : {
//             Authorization : `Bearer ${localStorage.getItem('token')}`
//          }
//       })

//       console.log(response.data || "null");


//       if(response.data.success){
//          let sno = 1;
//          const data  =  await response.data.leaves.map((leave) =>(
//          {
//             _id          :  leave._id,
//             sno          :  sno++,
//             employeeId   :  leave.employeeId.employeeId,
//             name         :  leave.employeeId.userId.name,
//             leaveType    :  leave.leaveType,
//             department   :  leave.employeeId.department.dep_name,
//             days         :  Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)),
//             status       :  leave.status,
//             action       :  <LeaveButtons Id={leave._id}/>,
//          }  
//       ))

//          setLeaves(data);
//          setFilteredLeaves(data); 

//       }
//     }
//     catch(error){
//       if(error.response && !error.response.data.success){
//         alert(error.response.data.error)
//         console.error("Error fetching leaves:", error.message); 
//       }
//     }
//   }
//   useEffect(() => {
//     fetchLeaves()
//   },[]);

//   const filterByInput = (e) =>{
//      const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))

//      setFilteredLeaves(data)
//   }

//   const filterByButton = (status) =>{
//     const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()))

//     setFilteredLeaves(data)
//  }
   

//   return (
//     <>
//        {filteredLeaves ? (      
//           <div className="p-6">
//             <div className="text-center">
//                 <h3 className="text-2xl font-bold">Manage Leaves</h3>
//             </div>
//             <div className="flex justify-between items-center">
//                 <input 
//                     type="text"
//                     placeholder="Search By Emp Id" 
//                     className="px-4 py-0.5 border"
//                     onChange={filterByInput}
//                     />
//                 <div className="space-x-3">
//                     <button  
//                         className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
//                         onClick={() => filterByButton("Pending")}
//                         >Pending</button>
//                     <button 
//                         className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
//                         onClick={() => filterByButton("Approved")}
//                         >Approved</button>
//                     <button 
//                         className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
//                         onClick={() => filterByButton("Rejected")}
//                         >Rejected</button>
//                 </div>
//             </div>
//             <div className="mt-3">
//                   <DataTable columns={columns} data={filteredLeaves} pagination/>
//             </div>
//           </div>
//        ) : <div> Loading ...</div>}
//     </>
    
//   )
// }

// export default Table


import React, {useEffect, useState} from 'react'
import DataTable from "react-data-table-component"
import {columns, LeaveButtons} from "../../utils/LeaveHelper"
import axios from "axios"

const Table = () => {
  const [leaves, setLeaves] = useState([])
  const [filteredLeaves, setFilteredLeaves] = useState([])

  const fetchLeaves = async () =>{
    try{
      const response = await axios.get("https://e-ms-ut2u.onrender.com/api/leave",{          
         headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
         }
      })

      if(response.data.success){
         let sno = 1;
         const data  =  await response.data.leaves.map((leave) =>(
         {
            _id          :  leave._id,
            sno          :  sno++,
            employeeId   :  leave.employeeId.employeeId,
            name         :  leave.employeeId.userId.name,
            leaveType    :  leave.leaveType,
            department   :  leave.employeeId.department.dep_name,
            days         :  Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)),
            status       :  leave.status,
            action       :  <LeaveButtons Id={leave._id}/>,
            raw          :  leave
         }  
      ))
         setLeaves(data);
         setFilteredLeaves(data); 
      }
    }
    catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
        console.error("Error fetching leaves:", error.message); 
      }
    }
  }

  useEffect(() => {
    fetchLeaves()
  },[]);

  const filterByInput = (e) =>{
     const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
     setFilteredLeaves(data)
  }

  const filterByButton = (status) =>{
    const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()))
    setFilteredLeaves(data)
 }

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-auto">
      {filteredLeaves ? (      
        <>
          <div className="text-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
            <input 
                type="text"
                placeholder="Search By Emp Id" 
                className="px-4 py-1 border rounded w-full sm:w-1/2"
                onChange={filterByInput}/>

            <div className="flex gap-2">
                <button  className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded" onClick={() => filterByButton("Pending")}>Pending</button>
                <button className="px-2 py-1 bg-green-600 text-white hover:bg-green-700 rounded" onClick={() => filterByButton("Approved")}>Approved</button>
                <button className="px-2 py-1 bg-red-600 text-white hover:bg-red-700 rounded" onClick={() => filterByButton("Rejected")}>Rejected</button>
            </div>
          </div>

          <div className="mt-6 hidden sm:block">
            <DataTable columns={columns} data={filteredLeaves} pagination responsive highlightOnHover/>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden mt-4 space-y-4">
            {filteredLeaves.map(leave => (
              <div key={leave._id} className="bg-white shadow rounded p-4">
                <div className="mb-2">
                  <p className="text-lg font-semibold">{leave.name}</p>
                  <p className="text-sm text-gray-500">Emp ID: {leave.employeeId}</p>
                  <p className="text-sm text-gray-500">Department: {leave.department}</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                  <p><strong>Days:</strong> {leave.days}</p>
                  <p><strong>Status:</strong> <span className={`font-semibold ${leave.status === 'Approved' ? 'text-green-600' : leave.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{leave.status}</span></p>
                </div>
                <div className="mt-3">
                  {leave.action}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : <div> Loading ...</div>}
    </div>
  )
}

export default Table
