import React, { useState, useMemo,useRef,useEffect } from "react";
import TaskService from "./../../services/TaskService";
import './../../Styles/Styles.css';
import { useFormik ,ErrorMessage} from 'formik'
import * as Yup from 'yup'
//import IGroupData from "../types/Group";
import Button from '@mui/material/Button';
import { useTable,Column } from "react-table";
import { RouteComponentProps,withRouter } from 'react-router-dom';

const CreateGroup = (props) => {
  const initialGroupState = {
    groupName:"",
    isActive:"1"
  };
  const initialValues = {
    groupName:'',
    isActive:'1'
  }
  const [groupList, setGroupList] = useState([]);
  const[rowId,setRowId]=useState(0);
  
  const groupRef = useRef();
  groupRef.current = groupList;
   useEffect(() => {   
     retrieveGroups();    
   }, []);
  const validationSchema = Yup.object({
              groupName: Yup.string()
             .required("This field is required!")
             .max(50)            
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {      
     CreateGroup(values.groupName)
    },
});
  const [group, setGroup] = useState(initialGroupState);
  const [submitted, setSubmitted] = useState(); 

  const CreateGroup = (groupName) => {
    var data = {
      groupName:groupName,
      isActive:"1"
    };

    TaskService.create(data)
      .then((response) => {
        if (response.data.isSuccess) {
            alert(response.data.message);
            TaskService.getAllGroups() .then((response) => {
              setGroupList(response.data);  
              })
              .catch((e) => {
                console.log(e);
              });
            
        }
        else {
            alert(response.data.errors);
        }
    })
  }; 
  const refreshList = () => {
    retrieveGroups();
  }; 
  const retrieveGroups = () => {    
    TaskService.getAllGroups() .then((response) => {
      setGroupList(response.data);  
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteGroup = (rowIndex) => {
    if (window.confirm('Are you sure you wish to delete this group?'))
    TaskService.removeGroup(rowIndex)
      .then((response) => {
        if (response.data.isSuccess) {
          alert(response.data.message);    
          props.history.push("/CreateGroup");
        let newGroups = [...groupRef.current];
        newGroups.splice(rowIndex, 1);
        setGroupList(newGroups);     
        refreshList();    
      }
      else {
          alert(response.data.errors);
      }
    });
  }
  const columns = useMemo(
    () => [
  
      {
        Header: "GroupName",
        accessor: "groupName",
      },
     
    // {
    //   Header: "Actions",
    //   accessor: "actions",
    //     Cell: (props) => {
    //       const rowIdx = props.row.id;
    //       setRowId(props.row.id);
    //       return (
            
    //       <div>              
          
    //       <span onClick={() => deleteGroup(groupRef.current[rowIdx].groupId)}>
    //         <button>Remove</button>
    //       </span>    
    //       </div>
    //     );
    //     },
    //   },
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
    data: groupList,
  });
  return (
    <div >           
         <form onSubmit={formik.handleSubmit}> 
        <div className="form-group col-3" >
          <label htmlFor="name">Group Name</label>
          <input
            type="text"
            className="form-control"
            id="groupName"
           
            value={formik.values.groupName}
            onChange={formik.handleChange}
            name="groupName"
          />
          {formik.errors.groupName ? 
      <div className="myDiv">{formik.errors.groupName}</div> : null}
        </div>
        <Button type="submit"
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Create Group</span>
                </Button>           
          
         </form>
         <div className="col-md-4 list">
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
        </div>        
  )
};

export default withRouter(CreateGroup);