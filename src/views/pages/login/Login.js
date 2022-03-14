import AuthService from "../../../services/AuthService";
import { RouteComponentProps,withRouter } from 'react-router-dom';
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Dashboard from '../../dashboard/Dashboard';
import { Link } from 'react-router-dom'
import { useFormik ,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'


const Login = (props) => {
  const [message,setMessage]=useState("");
  const initialValues = {
    userName:'',
    password:''
  }
  const validationSchema=()=> {
    return Yup.object().shape({
      userName: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }
  const saveUser=(userName, password)=>{
    var data = {
      userName: userName,
      password: password
  };
 //props.history.push('/');
 AuthService.login(userName, password) .then((response) => {
  props.history.push('/');
},
error => {
const resMessage =
  (error.response &&
    error.response.data &&
    error.response.data.message) ||
  error.message ||
  error.toString();
  setMessage("Invalid Credentials");

});
}
 
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{
      saveUser(values.userName,values.password);
      resetForm();
    }
  })  

  return (
    <div>
 
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput                       
                        id="userName"                        
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        name="userName"
                      placeholder="Username" autoComplete="username" />
                       {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}
        
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                         id="password"                        
                         value={formik.values.password}
                         onChange={formik.handleChange}
                         name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                      {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton  type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                    {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                    
                  </div>
                </div>
              )}
               </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  

    </div>
  )
}

export default Login
