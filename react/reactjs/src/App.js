import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApi from './container/MainApi';
import NewForm from './component/NewForm';
import Signup from './component/Signup';
import Signin from './component/Signin';
export default function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainApi/>}></Route>
      <Route path='/newform' element={<NewForm/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>

  )
}

