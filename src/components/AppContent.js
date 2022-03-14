import React, { Suspense } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = (props) => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props =>
                   
                      <route.component {...props} />
                   
                  }
                />
              )
            )
          })}
         {/* <Redirect from="/" to="/dashboard" />  */}
          {/* <Redirect from="/" to="/login" /> */}
          {/* console.log("check1")
          props.history.push('/login') */}
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default withRouter(AppContent)
