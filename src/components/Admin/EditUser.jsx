import React, { useState, ChangeEvent,useEffect } from "react";
import {Link } from "react-router-dom";
import UserDataService from "./../../services/UserService";
//import IUserData from './../../types/User';
import Button from '@mui/material/Button';
import './../../Styles/Styles.css';
import { useFormik ,ErrorMessage} from 'formik'
import { RouteComponentProps,useLocation } from 'react-router-dom';
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'

// interface RouterProps {
//   id: string; 
// }
//type Props = RouteComponentProps<RouterProps>;
const EditUser = (props) => {
  const initialUserState = {
    id: null,
    name:"",
    email: "",
    userName: "",
    password:"",
    confirmPassword:""
  };
  const [user, setUser] = useState(initialUserState);
  const initialValues = {
    name:user.name,
    email:user.email,
    userName:user.userName,
    password:user.password,
    confirmPassword:''
  }
  const params = useParams();
  useEffect(() => {   
    retrieveUserDetails();    
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const validationSchema = Yup.object({
            name : Yup.string()
             .required("This field is required!")
             .max(50),
             email: Yup.string()
              .required("This field is required!"),
              userName: Yup.string()
                .required("This field is required!")
                .max(600),
                password: Yup.string()
            .required("This field is required!"),
            confirmPassword: Yup
            .string()
            .required('Please retype your password.')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: values => {      
     updateUser(values.name,values.email,values.userName,values.password,values.confirmPassword)
    },
}); 
   const retrieveUserDetails = () => { 
     
     UserDataService.getUserById(props.location.state)   
      .then((response) => {
        console.log(response.data);
        
        setUser(response.data);    
        console.log(user);   
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateUser = (name,email,userName,password,confirmPassword) => {   
    var data = {
        name: name,
        email: email,
        userName: userName,
        password:password,
        confirmPassword:confirmPassword,
        isBlock:"0"
    };   

    // UserDataService.update(params.id,data)
    UserDataService.update(props.location.state,data)
      .then((response) => {
        if (response.data.isSuccess) {
            alert(response.data.message);           
            props.history.push("/base/RegisteredUsers");       
      
        }
        else {
            alert(response.data.errors);
        }
    })
      
  }; 
const cancelEdit=()=>{
  props.history.push("/base/RegisteredUsers");       
}
  return (
    <div className="CreateUser" >
      {submitted ? (
        <div>
          <h4>User has been created successfully!</h4>
          <div>          
          {/* <Link to={"/users"} className="nav-link">
              <button>View Users</button>
            </Link> */}
          </div>
         
        </div>
      ) : (

        <div>  
         <form onSubmit={formik.handleSubmit}>      
  <div className="form-row">
        <div className="form-group col-3" >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
           
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
          />
          {formik.errors.name ? 
      <div className="myDiv">{formik.errors.name}</div> : null}
        </div>

        <div className="form-group col-3">
          <label htmlFor="email">Email Id</label>
          <input
            type="text"
            className="form-control"
            id="email"
            
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
          {formik.errors.email ? 
      <div className="myDiv">{formik.errors.email}</div> : null}
        </div>
        </div>
        <div className="form-group col-3">
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            
            value={formik.values.userName}
            onChange={formik.handleChange}
            name="userName"
          />
          {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}
        </div>


        <div className="form-group col-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"            
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />
           
          {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group col-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"            
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            name="confirmPassword"
          />
           
          {formik.errors.confirmPassword ? 
      <div className="myDiv">{formik.errors.confirmPassword}</div> : null}
        </div>      

          <button type="submit" className="btn btn-primary me-4 mt-2" >Update</button>
          <button type="button" className="btn btn-primary mt-2 " onClick={cancelEdit}>Cancel</button>
         </form>
        </div>
        
      )}
    </div>
  );
};

export default EditUser;