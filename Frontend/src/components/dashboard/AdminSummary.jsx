// import React, { useState , useEffect } from 'react'
// import SummaryCard from "./SummaryCard.jsx"
// import { FaUsers , FaBuilding , FaMoneyBillWave , FaFileAlt , FaCheckCircle , FaHourglassHalf , FaTimesCircle} from "react-icons/fa"
// import axios from "axios"

// const AdminSummary = () => {
//   const [summary , setSummary] = useState(null)

//   useEffect(() => {
//     const fetchSummary = async () =>{
//       try{
//         const summary = await axios.get('https://e-ms-ut2u.onrender.com/api/dashboard/summary',{
//           headers : {
//             "Authorization" : `Bearer ${localStorage.getItem('token')}`
//           }
//         })
//         // console.log(summary.data)
//         setSummary(summary.data)
//       }catch(error){
//           if(error.response){
//              alert(error.response.data.error)
//           }
//           console.log(error.message)
//       }
//     }
//     fetchSummary()
//   },[])

//   if(!summary){
//     return <div> Loading ...</div>
//   }

//   return (
//     <div className="p-6">
//       <h3 className="text-2xl font-bold">Dashboard Overview</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//         <SummaryCard icon={<FaUsers/>} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600"/>
//         <SummaryCard icon={<FaBuilding/>} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600"/>
//         <SummaryCard icon={<FaMoneyBillWave/>} text="Monthly Salary" number={summary.totalSalary} color="bg-red-600"/>

//       </div>

//       <div className="mt-12">
//          <h4 className="text-center text-2xl font-bold"> Leave Details </h4>
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-teal-600"/>
//             <SummaryCard icon={<FaCheckCircle/>} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600"/>
//             <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-600"/>
//             <SummaryCard icon={<FaTimesCircle/>} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600"/>
//          </div>
//       </div>
      
//     </div>
//   )
// }

// export default AdminSummary






import React, { useState, useEffect } from 'react';
import SummaryCard from "./SummaryCard.jsx";
import {
  FaUsers, FaBuilding, FaMoneyBillWave, FaFileAlt,
  FaCheckCircle, FaHourglassHalf, FaTimesCircle
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://e-ms-ut2u.onrender.com/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="text-center py-10 text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6 w-full max-w-full box-border overflow-x-hidden">
      <h3 className="text-xl md:text-2xl font-bold text-center md:text-left">Dashboard Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-red-600" />
      </div>

      <div className="mt-10 md:mt-12">
        <h4 className="text-xl md:text-2xl font-bold text-center">Leave Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
