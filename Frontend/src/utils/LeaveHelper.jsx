import {useNavigate} from "react-router-dom"

export const columns = [
  {
    name     : "S No",
    selector : (row) => row.sno,
    width    : "100px"
  },
  {
    name     : "Emp Id",
    selector : (row) => row.employeeId,
    width    : "130px"
  },
  {
    name     : "Name",
    selector : (row) => row.name,
    width    : "210px"
  },
  {
    name     : "Leave Type",
    selector : (row) => row.leaveType,
    width    : "190px"
  },
  {
    name     : "Department",
    selector : (row) => row.department,    
    width    : "220px"
  },
  {
    name     : "Days",
    selector : (row) => row.days,
    width    : "120px"
  },
  {
    name     : "Status",
    selector : (row) => row.status,
    width    : "120px"
  },
  {
    name     : "Action",
    selector : (row) => row.action,
    center   : true,
  },
]

export const LeaveButtons = ({ Id }) =>{
   const navigate = useNavigate();

   const handleView = (id) =>{
     navigate(`/admin-dashboard/leaves/${id}`);       
   };

   return(
      <button
        className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
        onClick={() => handleView(Id)}
        >
         View
      </button>
   )
}