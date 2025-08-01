// import React, {useEffect, useState} from 'react'
// import {Link , useParams} from "react-router-dom"
// import axios from "axios"

// const View = () => {
//   const [salaries , setSalaries] = useState(null);
//   const [filteredSalaries, setFilteredSalaries] = useState(null);
//   const {id} = useParams()
//   let sno = 1;
  
//   const fetchSalaries = async() =>{
//      try{
//         const response = await axios.get(`https://e-ms-ut2u.onrender.com/api/salary/${id}`,{
//             headers: {
//                Authorization : `Bearer ${localStorage.getItem("token")}`,
//             }
//         })
//         console.log(response.data)
//         if(response.data.success){
//            setSalaries(response.data.salary);
//            setFilteredSalaries(response.data.salary)
//         }
//      }
//      catch(error){
//         if(error.response && error.response.data.success){
//           alert(error.message);
//         }
//      }
//   };

//   useEffect(() =>{
//       fetchSalaries();
//   },[])

//   const filterSalaries = (q) =>{
//       const filteredRecords = salaries.filter((leave) =>
//          leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())  
//       );
//       setFilteredSalaries(filteredRecords);
//   }

//   return (
//     <>
//        {filteredSalaries === null ? (
//           <div>Loading ...</div>
//        ) : (

     
//          <div className="overflow-x-auto p-5">

//             <div className="text-center">
//                <h2 className="text-2xl font-bold">Salary History</h2>
//             </div>

//             <div className="flex justify-end my-3">
//                <input 
//                   type="text"
//                   placeholder="Search by Emp Id"
//                   className="border px-2 rounded-md py-0.5 border-gray-300"
//                   onChange={filterSalaries} 
//                 />
//             </div>
         
//           {filteredSalaries.length > 0 ? (
//               <table className="w-full text-sm text-left text-gray-500">
//                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200">
//                     <tr>
//                        <th className="px-6 py-3">SNO</th>
//                        <th className="px-6 py-3">Emp ID</th>
//                        <th className="px-6 py-3">Salary</th>
//                        <th className="px-6 py-3">Allowance</th>
//                        <th className="px-6 py-3">Deduction</th>
//                        <th className="px-6 py-3">Total</th>
//                        <th className="px-6 py-3">Pay Date</th>
//                     </tr>
//                  </thead>

//                  <tbody>
//                     {filteredSalaries.map((salary) =>(
//                         <tr key={salary._id}
//                           className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                           >
//                           <td className="px-6 py-3">{sno++}</td>
//                           <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
//                           <td className="px-6 py-3">{salary.basicSalary}</td>
//                           <td className="px-6 py-3">{salary.allowances}</td>
//                           <td className="px-6 py-3">{salary.deductions}</td>
//                           <td className="px-6 py-3">{salary.netSalary}</td>
//                           <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
//                         </tr>
//                     ))}
//                  </tbody>
//               </table>
//             ) : <div>No Records </div>}
//          </div>
//        )}
//     </>
//   )
// }

// export default View









import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`https://e-ms-ut2u.onrender.com/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>

          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search by Emp Id"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={filterSalaries}
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr key={salary._id} className="bg-white border-b">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4 mt-6">
            {filteredSalaries.map((salary, index) => (
              <div
                key={salary._id}
                className="bg-white rounded shadow p-4 border border-gray-200"
              >
                <p className="text-sm text-gray-500">SNO: {index + 1}</p>
                <p><span className="font-semibold">Emp ID:</span> {salary.employeeId.employeeId}</p>
                <p><span className="font-semibold">Salary:</span> ₹{salary.basicSalary}</p>
                <p><span className="font-semibold">Allowance:</span> ₹{salary.allowances}</p>
                <p><span className="font-semibold">Deduction:</span> ₹{salary.deductions}</p>
                <p><span className="font-semibold">Total:</span> ₹{salary.netSalary}</p>
                <p><span className="font-semibold">Pay Date:</span> {new Date(salary.payDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default View;













