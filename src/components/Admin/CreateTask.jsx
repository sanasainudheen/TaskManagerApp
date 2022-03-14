import  React, { useState, ChangeEvent, Component } from "react";
import {Link } from "react-router-dom";
import TaskService from "./../../services/TaskService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
 import './../../Styles/Styles.css';
import { useFormik ,ErrorMessage} from 'formik'
import moment from 'moment';
import * as Yup from 'yup'
import DatePickerField from './DatePickerField';
const minDate=new Date();
const CreateTask = () => {
  const initialTaskState = {
    taskId: null,
    taskName:"",
    taskDescription: "",
    startDate: "",
    endDate:"",
    isActive:""
  };
  const initialValues = {
    taskName:'',
    taskDescription: '',
    startDate: '',
    endDate:''
  }
  const validationSchema = Yup.object({
              taskName: Yup.string()
             .required("This field is required!")
             .max(50),
             taskDescription: Yup.string()
              .required("This field is required!"),
            //   startDate: Yup.string()
            //     .required("This field is required!")
            //     .max(600),
            //     endDate: Yup.string()
            // .required("This field is required!"),           
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{      
      saveTask(values.taskName,values.taskDescription,startDate,endDate);
      resetForm();
    }
  })  
 
  const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

  const saveTask = (taskName,taskDescription,startDate,endDate) => {    
    var data = {
        taskName: taskName,
        taskDescription: taskDescription,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate:moment(endDate).format('YYYY-MM-DD'),        
        isActive:"1"
    };

    TaskService.createTask(data)
      .then((response) => {
        if (response.data.isSuccess) {
            alert(response.data.message);          
        
        }
        else {
            alert(response.data.errors);
        }
    })
  };

  return (
           <div>  
         <form onSubmit={formik.handleSubmit}>      
  <div className="form-row">
        <div className="form-group col-3" >
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="taskName"
           
            value={formik.values.taskName}
            onChange={formik.handleChange}
            name="taskName"
          />
          {formik.errors.taskName ? 
      <div className="myDiv">{formik.errors.taskName}</div> : null}
        </div>

        <div className="form-group col-3">
          <label htmlFor="taskDescription">Description</label>
          <input
            type="text"
            className="form-control"
            id="taskDescription"
            
            value={formik.values.taskDescription}
            onChange={formik.handleChange}
            name="taskDescription"          />
          {formik.errors.taskDescription ? 
      <div className="myDiv">{formik.errors.taskDescription}</div> : null}
        </div>

       
        <div className="col-md-3">
    <label htmlFor="sdate">Choose the start date</label>
<DatePicker className="form-control" selected={startDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setStartDate(date)}  minDate={minDate}/>
    </div>
    <div className="col-md-3">
    <label htmlFor="edate">Choose the end date</label>
 <DatePicker className="form-control" selected={endDate}  minDate={minDate}
      onChange={date=>setEndDate(date)} dateFormat='dd/MMM/yyyy'/>
    </div>
       
         
      
        
        <Button type="submit"
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Create Task</span>
                </Button>        
          </div>
         </form>
        </div>        
     
  );
};

export default CreateTask;