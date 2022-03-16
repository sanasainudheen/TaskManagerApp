import React, { useState, ChangeEvent,useEffect } from "react";
import Button from '@mui/material/Button';
import './../../Styles/Styles.css';
import {Modal} from 'react-bootstrap';  
import TaskService from "../../services/TaskService";
import { useParams } from 'react-router-dom'
import moment from 'moment';
import Helpers from "../../services/Helpers";


const TaskDetails = (props) => {
  const initialTaskState = {
    logId:"",
    userGroupTaskId:"",
     taskName:"",
     attachment:"",
    note:"",
     taskDescription:"",
     createdOn:"",    
   startDate:"",
     endDate:"",      

  };
  const [taskDetails, setTaskDetails] = useState([initialTaskState]);
  const [selStatus, setSelStatus] = React.useState("3");
  const [show, setShow] = React.useState(false);
  const[loading,setLoading]=React.useState(false);
  const initialValues = {
    logId:taskDetails.logId,
    userGroupTaskId:taskDetails.userGroupTaskId,
     taskName:taskDetails.taskName,
     attachment:taskDetails.attachment,
    note:taskDetails.note,
     taskDescription:taskDetails.taskDescription,
     createdOn:taskDetails.createdOn,    
   startDate:taskDetails.startDate,
     endDate:taskDetails.endDate, 
  }
  const params = useParams();
  useEffect(() => {   
    retrieveTaskDetails();    
  }, []);
 
   const retrieveTaskDetails = () => { 
    TaskService.AssignedTaskDetails(props.location.state,JSON.parse(localStorage.getItem("userId"))) .then((response) => {              
      setTaskDetails(response.data); 
     
     })
      .catch((e) => {
        console.log(e);
      });
    
  };
  const cancelEdit=()=>{
    props.history.push("/base/AssignedTasks");       
  }
  const  handleModal=()=>{  
    setShow(!show)  ;      
    }
    const UpdateStatus=()=>{
      var data = {      
        userGroupTaskId:props.location.state,
        userId:JSON.parse(localStorage.getItem("userId")),
         attachment:taskDetails[0].attachment,
        note:taskDetails[0].note,        
         createdOn:moment(new Date()).format('YYYY-MM-DD'),
         createdBy:"User",
         statusId:selStatus       
      };
      TaskService.updateUserStatus(data)
    .then((response) => {
      if (response.data.isSuccess) {
          alert(response.data.message);          
          TaskService.AssignedTaskDetails(props.location.state,JSON.parse(localStorage.getItem("userId"))) .then((response) => {            
            setTaskDetails(response.data);    
              handleModal(); 
              })
              .catch((e) => {
                console.log(e);
              });
      }
      else {
          alert(response.data.errors);
      }
  })
     }
    const handleDownload = (event) => {
    setLoading(true);
        Helpers.httpRequest(
          `https://localhost:5001/api/FileUploadApi?name=${taskDetails[0].attachment}`,
          'get',
        )
       // axios.get('https://localhost:5001/api/FileUploadApi',{ params: { file: this.state.file } })
       .then((response) => response.blob())
  .then((blob) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download',taskDetails[0].attachment);
    document.body.appendChild(link);
    link.click()
    link.parentNode.removeChild(link);
   setLoading(false)
  })
        .catch((error) => {
         
        });
      }
      
     
  return (
    
    <div>
       <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Task Title</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].taskName}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Task Description</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].taskDescription}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Start Date</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].startDate}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">End Date</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].endDate}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Attachment</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].attachment}/>
      <button disabled={loading} className="btn btn-secondary btn-sm" onClick={()=>handleDownload()} >{(loading) ? 'Downloading...' : 'Download'}</button>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Note</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].note}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Status</label>
    <div className="col-sm-10">
      <input type="text" readonly className="form-control-plaintext"  value={taskDetails[0].status}/>
    </div>
  </div>
 <div>
 <button type="submit" className="btn btn-primary me-4 mt-2" onClick={()=>handleModal()} >Update Status</button>
          <button type="button" className="btn btn-primary mt-2 " onClick={cancelEdit}>Cancel</button>
 </div>
 <Modal show={show} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>STATUS UPDATE</Modal.Header>  
          <Modal.Body>
          <label htmlFor="pmode">Select a Status</label>

<select className="form-control" value={selStatus} onChange={e=>setSelStatus(e.currentTarget.value)} >
    <option value="3">In Progress</option>
    <option value="4">Done</option>
</select>
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>UpdateStatus()}>Save</Button>
            <Button onClick={()=>handleModal()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
                     
                          
                        </div>  
                
  )

}
export default TaskDetails;