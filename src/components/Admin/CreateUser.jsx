import  React, { useState, ChangeEvent } from "react";
import {Link } from "react-router-dom";
import UserDataService from "./../../services/UserService";

import Button from '@mui/material/Button';
 import './../../Styles/Styles.css';
import { useFormik ,ErrorMessage} from 'formik'
import * as Yup from 'yup'

const CreateUser = () => {
  const initialUserState = {
    id: null,
    name:"",
    email: "",
    userName: "",
    password:"",
    confirmPassword:""
  };
  const initialValues = {
    name:'',
    email:'',
    userName:'',
    password:'',
    confirmPassword:''
  }
  const validationSchema = Yup.object({
              name: Yup.string()
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
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{
      saveUser(values.name,values.email,values.userName,values.password,values.confirmPassword);
      resetForm();
    }
  })  
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  

  const saveUser = (name,email,userName,password,confirmPassword) => {
   
    var data = {
        name: name,
        email: email,
        userName: userName,
        password:password,
        confirmPassword:confirmPassword,
        isBlock:"0"
    };

    UserDataService.create(data)
      .then((response) => {
        if (response.data.isSuccess) {
            alert(response.data.message);
            
        
        }
        else {
            alert(response.data.errors);
        }
    })
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="CreateUser" >
      {submitted ? (
        <div>
          <h4>User has been created successfully!</h4>
          <div> 
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
        <Button type="submit"
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Register</span>
                </Button>        
          
         </form>
        </div>        
      )}
    </div>
  );
};

export default CreateUser;