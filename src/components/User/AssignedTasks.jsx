import React, { useState, useMemo,useRef,useEffect,Fragment } from "react";
import { useTable } from "react-table";
import TaskService from "../../services/TaskService";
import {Link } from "react-router-dom";
const AssignedTasks=()=>{
    const [assignedTaskList, setAssignedTaskList] = useState([]);   
    const tasksRef = useRef();
    tasksRef.current = assignedTaskList;
    React.useEffect(()=>{
        async function GetAssignedTasksByUser(){
            TaskService.AssignedTasksByUser(JSON.parse(localStorage.getItem("userId")),"2") .then((response) => {              
                setAssignedTaskList(response.data);   

                })
                .catch((e) => {
                  console.log(e);
                });
        }    
      
        GetAssignedTasksByUser();
    },[]);
    const columns = useMemo(
        () => [
      
          {
            Header: "Task Name",
            accessor: "taskName",
          },
          {
            Header: "Start Date",
            accessor: "startDate",
          },
          {
            Header: "End Date",
            accessor: "endDate",
          },
                     
          {
            Header: "Actions",
            accessor: "actions",
              Cell: (props) => {
                const rowIdx = props.row.id;
               
                return (          
                  
                <div> 
                   <Link to={{  pathname: "/TaskDetails",  state: tasksRef.current[rowIdx].userGroupTaskId}}>
                    <button type="button" className="btn btn-link">View Details</button>
                </Link>  
               
                </div>
              );
              },
            },
          ],
          []
        );
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: assignedTaskList,
      });
    return(
        <div  className="col-md-12">
             <table
             className="table table-striped table-bordered"
             {...getTableProps()} >
             <thead>
               {headerGroups.map((headerGroup) => (
                 <tr {...headerGroup.getHeaderGroupProps()}>
                   {headerGroup.headers.map((column) => (
                     <th {...column.getHeaderProps()}>
                       {column.render("Header")}
                     </th>
                   ))}
                 </tr>
               ))}
             </thead>
             <tbody {...getTableBodyProps()}>
               {rows.map((row, i) => {
                 prepareRow(row);
                 return (
                   <tr {...row.getRowProps()}>
                     {row.cells.map((cell) => {
                       return (
                         <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                       );
                     })}
                   </tr>
                 );
               })}
             </tbody>
           </table>
        </div>
    )
}
export default AssignedTasks;