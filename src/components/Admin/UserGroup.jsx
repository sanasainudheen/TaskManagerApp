import React, { useState, useMemo,useRef,useEffect,Fragment } from "react";
import UserService from "./../../services/UserService";
import TaskService from "./../../services/TaskService";
import './../../Styles/Styles.css';
import { useToasts } from "react-toast-notifications";
import { Button,Modal} from 'react-bootstrap';  
import { useTable } from "react-table";
import { Table,  Card,  ModalBody, ModalFooter, CardBody, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
const UserGroup=()=>{
    const [groupValue, setGroupValue] = React.useState("");
    const [groups, setGroups] = useState([{id:0,categoryName:'Select A Group'}]);
    const [userGroupList, setUserGroupList] = useState([]);
    const [users, setUsers] = useState([]);
    const [selUser, setSelUser] = React.useState("");
    const [show, setShow] = React.useState(false);
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
        async function getUserGroups(){
            TaskService.getAllUserGroups() .then((response) => {              
                setUserGroupList(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }
        getGroups();
        getUserGroups();
    },[]);
  
 const  handleModal=()=>{  
    setShow(!show)  ;
      getUsers(); 
    }
   const getUsers=()=>{
        UserService.getTheUsers()
        .then((response) => {
           
            const UserList = [{id: '-1', name: 'Please Select A User...'}, ...response.data];
            setUsers(UserList);
    })
        .catch((e) => {
        });       
    }
    const handleGroupChange=()=>{
        event.preventDefault();   
       const value = event.currentTarget.value;
       setGroupValue(event.target.value)
    // UserDataService.getAllServices(event.target.value)
    // .then((response) => {
    //     const ServiceList = [{id: -1, serviceName: 'Please Select a Service...',categoryId:-1}, ...response.data];
    //     setServices(ServiceList);
    // })
    // .catch((e) => {
     
    // });
    } 
    const showModal=()=>{

    }
    // const toggleDanger = (name, id) => {       
    //     setDeleteModal(true)
    // }
   
      
       const SaveUserGroup=()=>{
        var data = {
            GroupId:groupValue,
    UserId:selUser,
    isActive:"1"
        };
        TaskService.createUserGroup(data)
      .then((response) => {
        if (response.data.isSuccess) {
            alert(response.data.message);          
            TaskService.getAllUserGroups() .then((response) => {            
                setUserGroupList(response.data);   
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
       const columns = useMemo(
        () => [
      
          {
            Header: "Group Name",
            accessor: "groupName",
          },
          {
            Header: "User Name",
            accessor: "name",
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
        data: userGroupList,
      });
    return(
    <div>
        <div className="row">
     <div className="col-md-3">
    <label htmlFor="group">Select a Group</label>

<select className="form-control" value={groupValue}  
onChange={ e=>{handleGroupChange(e);setGroupValue(e.target.selectedOptions[0].value)}}>

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
        <button type="button" className="btn btn-primary mt-2 " onClick={()=>handleModal()}>Add User</button>
            </div>     
            <div>
            <table
        className="table table-striped table-bordered"
        {...getTableProps()}
      >
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
            {/* <div>      
            <Fragment> 
            <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">
            <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                           Choose the User  
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                    <div  className="col-md-6">
    <label htmlFor="service">Select a User</label>
   
   <select  className="form-control" value={selUser} onChange={e=>setSelUser(e.currentTarget.value)}>
   {
       users.map(({Id,Name})=>(
           <option
           key={Id} value={Id}>{Name}</option>
       ))
   }
   </select>
    </div>                       
                    </Modal.Body>  
                                            <ModalFooter>
                                            <button type="button" className="btn btn-outline-info" onClick={() => selectUser(selUser)}> Select User</button>
                                                <Button onClick={closeDeleteModal}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>
                                        </Fragment>
                                        </div> */}
                                        <Modal show={show} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>Select a user</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selUser} onChange={e=>setSelUser(e.currentTarget.value)}>
   {
       users.map(({id,name})=>(
           <option
           key={id} value={id}>{name}</option>
       ))
   }
   </select>
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>SaveUserGroup()}>Save</Button>
            <Button onClick={()=>handleModal()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
          </div>
)
    }

export default UserGroup;