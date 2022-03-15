import React, { useState, useMemo,useRef,useEffect,Fragment } from "react";
import { useTable } from "react-table";
import TaskService from "./../../services/TaskService";
const ViewGroupTasks=()=>{
    const [groupTaskList, setGroupTaskList] = useState([]);
    React.useEffect(()=>{
        async function GetGroupTasksByUser(){
           // string userId=localStorage.getItem("userId")
            TaskService.GetGroupTasksByUser(JSON.parse(localStorage.getItem("userId"))) .then((response) => {              
                setGroupTaskList(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }    
      
        GetGroupTasksByUser();
    },[]);
    const columns = useMemo(
        () => [
      
          {
            Header: "Group Name",
            accessor: "groupName",
          },
          {
            Header: "Task",
            accessor: "taskName",
          },
          {
            Header: "Status",
            accessor: "status",
          },
                     
          {
            Header: "Actions",
            accessor: "actions",
              Cell: (props) => {
                const rowIdx = props.row.id;
               
                return (          
                  
                <div>  
                  {/* <button type="button" className="btn btn-link" onClick={()=>SelectTask(tasksRef.current[rowIdx].taskId)}>Select</button>
                */}
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
        data: groupTaskList,
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
export default ViewGroupTasks;