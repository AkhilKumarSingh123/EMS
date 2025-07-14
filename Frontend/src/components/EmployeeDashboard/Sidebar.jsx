// import React from 'react'
// import {NavLink} from "react-router-dom"
// import {useAuth } from "../../context/authContext"
// import { FaBuilding , FaCalendarAlt , FaCogs , FaMoneyBillWave , FaTachometerAlt , FaUsers } from "react-icons/fa"

// const Sidebar = () => {
//   const { user } = useAuth()
//   return (
//     <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
//         <div className="bg-teal-600 h-12 flex items-center justify-center">
//             <h3 className="text-2xl text-center">Employee MS</h3>
//         </div>
//         <div className="px-4">
//               <NavLink to="/employee-dashboard"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}
//                   end>
//                   <FaTachometerAlt/>
//                   <span>Dashboard</span>
//               </NavLink>

//               <NavLink to={`/employee-dashboard/profile/${user._id}`}
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaUsers/>
//                   <span>My Profile</span>
//               </NavLink>

//               <NavLink to={`/employee-dashboard/leaves/${user._id}`}    
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaBuilding/>
//                   <span>Leaves</span>
//               </NavLink>

//               <NavLink to={`/employee-dashboard/salary/${user._id}`}
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}
//                   end>
//                   <FaCalendarAlt/>
//                   <span>Salary</span>
//               </NavLink>

//               <NavLink to="/employee-dashboard/setting"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}
//                   end>
//                   <FaCogs/>
//                   <span>Settings</span>
//               </NavLink>
//         </div>
//     </div>
//   )
// }

// export default Sidebar











import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import {
  FaBars, FaBuilding, FaCalendarAlt, FaCogs,
  FaTachometerAlt, FaUsers
} from 'react-icons/fa'

const EmployeeSidebar = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false)
  }

  const menuItems = [
    {
      to: '/employee-dashboard',
      icon: <FaTachometerAlt />,
      label: 'Dashboard',
      exact: true,
    },
    {
      to: `/employee-dashboard/profile/${user._id}`,
      icon: <FaUsers />,
      label: 'My Profile',
    },
    {
      to: `/employee-dashboard/leaves/${user._id}`,
      icon: <FaBuilding />,
      label: 'Leaves',
    },
    {
      to: `/employee-dashboard/salary/${user._id}`,
      icon: <FaCalendarAlt />,
      label: 'Salary',
    },
    {
      to: '/employee-dashboard/setting',
      icon: <FaCogs />,
      label: 'Settings',
    },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-white bg-teal-600 p-2 rounded md:hidden"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full'} md:translate-x-0 md:w-64`}
      >
        <div className="bg-teal-600 h-12 flex items-center justify-center">
          <h3 className="text-2xl text-center">Employee MS</h3>
        </div>

        <div className="px-4">
          {menuItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700`
              }
              end
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}

export default EmployeeSidebar
