import React, { useState, useEffect, useMemo, useRef, Fragment  } from "react";
import UserDataService from "./../../services/UserService";
import { useTable } from "react-table";
import {Route , withRouter} from 'react-router-dom'
import EditUser from "./EditUser";
import {Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


const UserList = (props) => {
   
  const [userList, setUserList] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const[showModal,setShowModel]=useState(false);
  const[showModalPopup,setShowModalPopup]=useState(false);
  const [selStatusValue, setSelStatusValue] = React.useState("1");
  const [selRequest, setSelRequest] = React.useState([]);
  const [message, setMessage] = useState("");
  const[rowId,setRowId]=useState(0);
  const usersRef = useRef();
  usersRef.current = userList;
  useEffect(() => {   
    retrieveUsers();    
  }, []);
  function isShowPopup (status)  {  
    setShowModalPopup(status);  
  }; 
 
function handleClose ()  {  
  isShowPopup(false); 
}  

const deleteUser = (rowIndex) => {
  if (window.confirm('Are you sure you wish to delete this user?'))
  UserDataService.remove(rowIndex)
    .then((response) => {
      if (response.data.isSuccess) {
        console.log("1");
        props.history.push("/base/RegisteredUsers");
      let newUsers = [...usersRef.current];
      newUsers.splice(rowIndex, 1);
      setUserList(newUsers);     
      refreshList();    
    }
    else {
    
        alert(response.data.message);
    }
  });
}
const blockUser = (rowIndex) => {   
  if (window.confirm('Are you sure you wish to block this user?'))
  UserDataService.block(rowIndex)
    .then((response) => {
      if (response.data.isSuccess) {
          alert(response.data.message);           
          props.history.push("/base/RegisteredUsers");   
      }
      else {
          alert("response.data.errors");
      }
  })    
}; 
  const retrieveUsers = () => {    
    UserDataService.getAll() .then((response) => {
      setUserList(response.data);    
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveUsers();
  }; 
  
  const columns = useMemo(
    () => [
  
      {
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "EmailId",
        accessor: "email",
      },
      {
        Header: "Username",
        accessor: "userName",
      },       
    {
      Header: "Actions",
      accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          setRowId(props.row.id);
          return (            
          <div> 
 
 <Link to={{ 
 pathname: "/EditUser", 
 state: usersRef.current[rowIdx].id
}}>
<button type="button" class="btn btn-link">Edit</button>
</Link>         
            <button type="button" class="btn btn-link" onClick={() => blockUser(usersRef.current[rowIdx].id)}>Block</button>
           <button type="button" class="btn btn-link" onClick={() => deleteUser(usersRef.current[rowIdx].id)}>Delete</button>
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
    data: userList,
  });
 
  return (
    
    <div className="list row AddUser">
    
{userList?(
    <div className="col-md-12 list">
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
    </div>):
    (
<div>No Users Found</div>
    )
    }
  </div>
);
};
export default withRouter(UserList);