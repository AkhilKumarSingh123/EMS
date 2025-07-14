// import React from 'react'
// import {NavLink} from "react-router-dom"
// import { FaBuilding , FaCalendarAlt , FaCogs , FaMoneyBillWave , FaTachometerAlt , FaUsers } from "react-icons/fa"

// const AdminSidebar = () => {
//   return (
//     <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
//         <div className="bg-teal-600 h-12 flex items-center justify-center">
//             <h3 className="text-2xl text-center">Employee MS</h3>
//         </div>
//         <div className="px-4">
//               <NavLink to="/admin-dashboard"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}
//                   end>
//                   <FaTachometerAlt/>
//                   <span>Dashboard</span>
//               </NavLink>

//               <NavLink to="/admin-dashboard/employees"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaUsers/>
//                   <span>Employee</span>
//               </NavLink>

//               <NavLink to="/admin-dashboard/departments"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaBuilding/>
//                   <span>Department</span>
//               </NavLink>

//               <NavLink to="/admin-dashboard/leaves"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaCalendarAlt/>
//                   <span>Leaves</span>
//               </NavLink>

//               <NavLink to="/admin-dashboard/salary/add" 
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaMoneyBillWave/>
//                   <span>Salary</span>
//               </NavLink>

//               <NavLink to="/admin-dashboard/setting"
//                   className={({isActive}) =>`${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//                   <FaCogs/>
//                   <span>Settings</span>
//               </NavLink>
//         </div>
//     </div>
//   )
// }

// export default AdminSidebar;








import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBars, FaBuilding, FaCalendarAlt, FaCogs,
  FaMoneyBillWave, FaTachometerAlt, FaUsers
} from 'react-icons/fa';

const menuItems = [
  { to: '/admin-dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin-dashboard/employees', icon: <FaUsers />, label: 'Employee' },
  { to: '/admin-dashboard/departments', icon: <FaBuilding />, label: 'Department' },
  { to: '/admin-dashboard/leaves', icon: <FaCalendarAlt />, label: 'Leaves' },
  { to: '/admin-dashboard/salary/add', icon: <FaMoneyBillWave />, label: 'Salary' },
  { to: '/admin-dashboard/setting', icon: <FaCogs />, label: 'Settings' },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-white bg-teal-600 p-2 rounded md:hidden"
      >
        <FaBars />
      </button>

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
  );
};

export default AdminSidebar;






