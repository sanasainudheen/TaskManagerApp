import React, { useState, useMemo,useRef,useEffect,Fragment } from "react";
import { useTable } from "react-table";
import TaskService from "./../../services/TaskService";
import {Link } from "react-router-dom";
const TaskDetails=(props)=>{
     const initialValues = {
        logId:"",
        userGroupTaskId:"",
         taskName:"",
         attachment:"",
        note:"",
         taskDescription:"",
         createdOn:"",    
       startDate:"",
         endDate:"",      
          
      }
     const [taskDetails, setTaskDetails] = useState(initialValues);    
     useEffect(() => {   
        retrieveTaskDetails();    
      }, []);
      const retrieveTaskDetails = () => { 
     
        TaskService.AssignedTaskDetails(props.location.state) .then((response) => {              
            setTaskDetails(response.data);    
          
            console.log(response.data);
            console.log(taskDetails);
            })
            .catch((e) => {
              console.log(e);
            });
    }    
     
//    useEffect(()=>{
//         async function ViewTaskDetails(){
//             TaskService.AssignedTaskDetails(props.location.state) .then((response) => {              
//                 setTaskDetails(response.data);    
              
//                 console.log(taskDetails);
//                 })
//                 .catch((e) => {
//                   console.log(e);
//                 });
//         }    
      
//         ViewTaskDetails();
//     },[]);
   
    return(
        <div  className="col-md-12">
            <label className="form-Control">TaskName</label>
            :
            <input type="text" value={taskDetails.taskName}/>
        </div>
    )
}
export default TaskDetails;