import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApi from './container/MainApi';
import NewForm from './component/NewForm';
import Signup from './component/Signup';
import Signin from './component/Signin';
import Forgot_pass from './component/Forgot_pass';
export default function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signin/>}></Route>
      <Route path='/mainpage' element={<MainApi/>}></Route>
      <Route path='/newform' element={<NewForm/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forgot_pass' element={<Forgot_pass/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>

  )
}

