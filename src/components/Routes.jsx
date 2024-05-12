import React from 'react'
import { BrowserRouter as Router, Routes as MyRoutes, Navigate, Route } from "react-router-dom";
import { Result } from './Result';

export const Routes = () => {
  return (
    <div className='p-4'>
        <Router>
            <MyRoutes>
                <Route exact path='/' element={<Navigate to='/search' />} />
                <Route exact path='/search' element={<Result/>} />
            </MyRoutes>
        </Router>
    </div>
  )
}
