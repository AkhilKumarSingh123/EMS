// import React , {useState, useEffect} from 'react'
// import {Link, useParams} from "react-router-dom"
// import {useAuth } from "../../context/authContext";
// import axios from "axios"

// const List = () => {
//   const {user} = useAuth()
//   const [leaves, setLeaves] = useState([])
//   let sno = 1;

//   const {id} = useParams()
// //   const id = user.role === "admin" ? user._id : empId

//    const fetchLeaves = async() =>{
//       try{ 
//          const response = await axios.get(`https://e-ms-ut2u.onrender.com/api/leave/${id}`,{         ///////////////////////////////////// user._id id
//             headers: {
//                Authorization : `Bearer ${localStorage.getItem("token")}`,
//             }
//          })
//          if(response.data.success){
//             setLeaves(response.data.leaves);
//          }
//       }
//       catch(error){
//          if(error.response && error.response.data.success){
//             alert(error.message);
//          }
//       }
//    };

//  useEffect(() =>{
//    fetchLeaves();
//  },[])


//   return (
//     <div className="p-6">
//         <div className="text-center">
//               <h3 className="text-2xl font-bold">Manage Leaves</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input 
//                 type="text"
//                 placeholder="Search By Department Name" 
//                 className="px-4 py-0.5 border"
//                 />
//             {user.role === "employee" && (
//                <Link 
//                   to="/employee-dashboard/add-leave" 
//                   className="px-4 py-1 bg-teal-600 rounded text-white">Add New Leave</Link>
//             )}        
//           </div>

//           <table className="mt-6 w-full text-sm text-left text-gray-500">
//                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200">
//                     <tr>
//                        <th className="px-6 py-3">SNO</th>
//                        <th className="px-6 py-3">Leave Type</th>
//                        <th className="px-6 py-3">From</th>
//                        <th className="px-6 py-3">To</th>
//                        <th className="px-6 py-3">Description</th>
//                        <th className="px-6 py-3">Status</th>
//                     </tr>
//                  </thead>

//                  <tbody>
//                     {leaves.map((leave) =>(
//                         <tr key={leave._id}
//                           className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                           >
//                           <td className="px-6 py-3">{sno++}</td>
//                           <td className="px-6 py-3">{leave.leaveType}</td>
//                           <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
//                           <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
//                           <td className="px-6 py-3">{leave.reason}</td>
//                           <td className="px-6 py-3">{leave.status}</td>

//                         </tr>
//                     ))}
//                  </tbody>
//               </table>
//     </div>
//   )
// }

// export default List







import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../context/authContext";
import axios from "axios"

const List = () => {
  const { user } = useAuth()
  const [leaves, setLeaves] = useState([])
  const { id } = useParams()
  let sno = -4;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`https://e-ms-ut2u.onrender.com/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    }
    catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [])

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-4">
        <h3 className="text-xl sm:text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-1 border rounded w-full sm:w-1/2"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-2 text-center bg-teal-600 rounded text-white w-full sm:w-auto">
            Add New Leave
          </Link>
        )}
      </div>

      {/* Desktop Table */}
      <div className="mt-6 hidden sm:block">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden mt-6 space-y-4">
        {leaves.map((leave) => (
          <div key={leave._id} className="bg-white shadow rounded p-4">
            <p className="text-sm text-gray-600">SNO: {sno++}</p>
            <p className="text-lg font-semibold">{leave.leaveType}</p>
            <p className="text-sm text-gray-600">From: {new Date(leave.startDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">To: {new Date(leave.endDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Description: {leave.reason}</p>
            <p className="text-sm font-semibold text-gray-800">Status: <span className={`${leave.status === 'Approved' ? 'text-green-600' : leave.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{leave.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List