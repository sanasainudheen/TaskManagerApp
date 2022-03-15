import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader,AppUserSideBar } from '../components/index'
import  { Component } from "react";

class DefaultLayout  extends Component  {
  render() {
    const role =JSON.parse(localStorage.getItem("role"));
  
  
  return (
 
    (role == "Admin") ?
    (
       <>
      
      <AppSidebar />     
      
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      </>   
    )
     :
     (
     <>
       
     <AppUserSideBar/>
     <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      </>   
    
  )
 
  )
}
}

export default DefaultLayout;
