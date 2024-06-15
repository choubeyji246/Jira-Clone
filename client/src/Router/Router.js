import React from 'react'
import { Route, Routes , BrowserRouter} from 'react-router-dom'

import Home from '../Home/Home'
import Register from '../Component/Auth/Register'
import Login from "../Component/Auth/Login"
import Dashboard from '../Dashboard/Dashboard'
import Task from '../Task/Task'

const Router = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth/login' element={<Login/>}></Route>
        <Route path='/auth/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/task' element={<Task/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
