// 






import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../context/authContext";
import axios from "axios"
import { DepartmentButtons } from "../../utils/DepartmentHelper.jsx"

const DepartmentList = () => {
  const { user } = useAuth()
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filterDepartments, setFilterDepartments] = useState([])
  const { id } = useParams()
  let sno = 1;

  const onDepartmentDelete = () => {
    fetchDepartments()
  }

  const fetchDepartments = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get("https://e-ms-ut2u.onrender.com/api/department", {
        headers: {
          "Authorization": `Beared ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => (
          {
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
          }
        ))
        setDepartments(data);
        setFilterDepartments(data)
      }
    }
    catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setDepLoading(false)
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [])

  const filterDepartment = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartments(records)
  }

  return (
    <>
      {depLoading ? <div>Loading....</div> :
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Department</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
            <input
              type="text"
              placeholder="Search By Department Name"
              className="px-4 py-1 border rounded w-full sm:w-1/2"
              onChange={filterDepartment} />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-2 text-center bg-teal-600 rounded text-white w-full sm:w-auto">
              Add New Department
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="mt-6 hidden sm:block">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Department Name</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterDepartments.map((dep) => (
                  <tr key={dep._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-3">{dep.sno}</td>
                    <td className="px-6 py-3">{dep.dep_name}</td>
                    <td className="px-6 py-3">
                      <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden mt-6 space-y-4">
            {filterDepartments.map((dep) => (
              <div key={dep._id} className="bg-white shadow rounded p-4 space-y-2">
                <p className="text-sm text-gray-600">SNO: {dep.sno}</p>
                <p className="text-lg font-semibold">{dep.dep_name}</p>
                <div>
                  <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  )
}

export default DepartmentList
