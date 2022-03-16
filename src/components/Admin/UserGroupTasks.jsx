import React, { useState, useMemo,useRef,useEffect,Fragment } from "react";
import UserService from "./../../services/UserService";
import TaskService from "./../../services/TaskService";
import './../../Styles/Styles.css';
import { Button,Modal} from 'react-bootstrap';  
import { useTable } from "react-table";
import { Table } from 'reactstrap';

import moment from 'moment';
const UserGroupTasks=(props)=>{
    const [groups, setGroups] = useState([{id:0,categoryName:'Select A Group'}]);
    const [groupValue, setGroupValue] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [showUser, setShowUser] = React.useState(false);
    const [selTask, setSelTask] = React.useState("");
    const [taskList, setTaskList] = useState([]);
    const [userGroupTaskList, setUserGroupTaskList] = useState([]);
    const [serialNum] = useState(1);
    const [selUser, setSelUser] = React.useState("");
    const [users, setUsers] = useState([]);
    const [selUserGroupTaskId, setSelUserGroupTaskId] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const[note,setNote]=React.useState("");
  
    const tasksRef = useRef();
    tasksRef.current = taskList;
    React.useEffect(()=>{
        async function getGroups(){
            TaskService.getAllGroups()
            .then((response) => {
                const GroupList = [{groupId: -1, groupName: 'Please Select A Group...',isActive:''}, ...response.data];
                setGroups(GroupList);
        })
            .catch((e) => {
            });       
        }
        async function getTasks(){
            TaskService.getAllTasks() .then((response) => {              
                setTaskList(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }    
        async function getUserGroupTasks(){
            TaskService.getAllUserGroupTasks() .then((response) => {  
                         
                setUserGroupTaskList(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }        
        getGroups();       
        getTasks();
        getUserGroupTasks();
    },[]);
    const SelectTask=(TaskId)=>{
      setSelTask(TaskId);
    //    console.log("hai");
    //    console.log(groupValue);
    //     var data = {
    //         GroupId:groupValue,
    //         TaskId:TaskId,
    //         IsActive:"1",
    //         StatusId:"1"
    //     };
    //     console.log(data);
    //     TaskService.createUserGroupTask(data)
    //   .then((response) => {
    //     if (response.data.isSuccess) {
    //         alert(response.data.message);          
            // TaskService.getAllUserGroups() .then((response) => {            
            //     setUserGroupList(response.data);   
            //     handleModal(); 
            //     })
            //     .catch((e) => {
            //       console.log(e);
            //     });
       // }
        // else {
        //     alert(response.data.errors);
        // }
    // })
       }
       const SaveTask=()=>{
       
          var data = {
              GroupId:groupValue,
              TaskId:selTask,
              IsActive:"1",
              StatusId:"1"
          };
         
          TaskService.createUserGroupTask(data)
        .then((response) => {
          if (response.data.isSuccess) {
              alert(response.data.message);   
              handleModal();       
              TaskService.getAllUserGroupTasks() .then((res) => {                          
                setUserGroupTaskList(res.data);    
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
    const  handleModal=()=>{     
        setShow(!show)  ;      
        }
        const  handleModal1=(groupId)=>{     
            setShowUser(!showUser)  ;  
            getUsersByGroupId(groupId);   
            }
            const getUsersByGroupId=(groupId)=>{
                UserService.getUsersByGroupId(groupId)
                .then((response) => {
                   
                    const UserList = [{id: '-1', name: 'Please Select A User...'}, ...response.data];
                    setUsers(UserList);
            })
                .catch((e) => {
                });   
            }
            const  handleModal2=()=>{     
              setShowUser(!showUser)  ; 
            }
        const columns = useMemo(
            () => [
          
              {
                Header: "Name",
                accessor: "taskName",
              },
              {
                Header: "Description",
                accessor: "taskDescription",
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
                      <button type="button" className="btn btn-link" onClick={()=>SelectTask(tasksRef.current[rowIdx].taskId)}>Select</button>
                   
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
            data: taskList,
          });


          const SaveTask1=()=>{
            var data = {
                UserGroupTaskId:selUserGroupTaskId,
                UserId:selUser,
                StatusId:"2",
                Attachment: selUserGroupTaskId+"."+selectedFile.name.split('.').pop()    ,
                Note:note,
                CreatedOn: moment(new Date()).format('YYYY-MM-DD'),
                CreatedBy:"Admin"
            };
          
            TaskService.AssignTaskToUser(data)
          .then((response) => {
            if (response.data.isSuccess) {
                alert(response.data.message); 
                handleModal2();
                TaskService.getAllUserGroupTasks() .then((res) => {                           
                 setUserGroupTaskList(res.data);                     
                  onFileUpload();
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
     const  onFileChange = (e) => {
    
            // Update the state
            setSelectedFile(e.target.files[0]);           
          
          };
       const onFileUpload = () => {
               const formData = new FormData();
         var fileExtension = selectedFile.name.split('.').pop();
        
         formData.append(
           "myFile",
           selectedFile,
           selUserGroupTaskId+"."+fileExtension          
         );                       
            console.log(selUserGroupTaskId+"."+fileExtension  );
     
             TaskService.uploadDoc(formData) .then(          
              (response) => {
                 console.log("success");
               }, () => {
                 console.log("fail");
               });
            
          };   
    return(
        <div>
        <div className="row">
     <div className="col-md-3">
    <label htmlFor="group">Select a Group</label>

<select className="form-control" value={groupValue}  
onChange={ e=>{setGroupValue(e.target.selectedOptions[0].value)}}>

    {groups.map(({groupId,groupName})=>(
        <option               
         key={groupId} value={groupId}>
            {groupName}
        </option>
    ))}
</select>
    </div>
    </div>    
    <div>
        <button type="button" className="btn btn-primary mt-2 " onClick={()=>handleModal(Event)}>Add Task</button>
            </div> 
            <br/>
            <br/>
          <sharp><b> Available Tasks</b> </sharp> 
          <div>
          <Table bordered responsive size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Group Name</th>
                                    <th> Task Name</th>
                                    <th> Status</th>
                                    <th className="text-center"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userGroupTaskList?.map((user, i) => <tr key={user.UserGroupTaskId} >
                                        <td>{serialNum + i}</td>
                                        <td>{user.groupName}</td>
                                        <td>{user.taskName}</td>
                                        <td>{user.status}</td>
                                        <td><Button color="primary" size="sm" className="mr-3" onClick={() =>{setSelUserGroupTaskId(user.userGroupTaskId), handleModal1(user.groupId)}}> Assign User</Button></td>
                                        </tr>)}</tbody>
                                        </Table>
          </div>
          <div  className="col-md-9">
            <Modal  show={show} onHide={()=>handleModal()}>  
          <Modal.Header>Select a Task</Modal.Header>  
          <Modal.Body>
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
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>SaveTask()}>Save</Button>
            <Button onClick={()=>handleModal()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  

</div>
        <Modal show={showUser} onHide={()=>handleModal1()}>  
          <Modal.Header></Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selUser} onChange={e=>setSelUser(e.currentTarget.value)}>
   {
       users.map(({id,name})=>(
           <option
           key={id} value={id}>{name}</option>
       ))
   }
   </select>   
   <div>
     <label>Enter Note:</label>
   <input className="form-control" type="textarea" placeholder="Note"  onChange={(e)=>{setNote(e.target.value)}}></input>
   </div>
   <div>
     <label></label>
     <br/>
                <input type="file" onChange={(e)=>{ setSelectedFile(e.target.files[0]);}} />
               
            </div>
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>SaveTask1()}>Assign</Button>
            <Button onClick={()=>handleModal2()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
          </div>
)
    }
   
export default UserGroupTasks;