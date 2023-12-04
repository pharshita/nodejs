import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../containers/Navbar'
import { useNavigate } from 'react-router-dom'

export default function AddProducts() {
  const navigate = useNavigate()
  const [productName,setProductName]=useState("")
  const [productPrice,setProductPrice]=useState("")
  const [productCategory,setProductCategory]=useState("")
  const [companyName,setCompanyName]=useState("")
  const [file,setFile]=useState(null)
  // const addProduct = ()=>{
  //   const payload={
  //     file:file,
  //     name:productName,
  //     price:productPrice,
  //     category:productCategory,
  //     userId:JSON.parse(localStorage.getItem('auth')).id,
  //     company:companyName,
  //   }
  //   axios.post('http://localhost:5000/add-product',payload)
  //   .then((res)=>{
  //     navigate('/')
  //     setProductName("")
  //     setProductPrice("")
  //     setProductCategory("")
  //     setCompanyName("")
  //   })
  // }

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', productName);
      formData.append('price', productPrice);
      formData.append('category', productCategory);
      formData.append('userId', JSON.parse(localStorage.getItem('auth')).id);
      formData.append('company', companyName);

      await axios.post('http://localhost:5000/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
      setProductName('');
      setProductPrice('');
      setProductCategory('');
      setCompanyName('');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  return (
    <>
      <div>
        <div>
          <label >Add Produnct</label><br/>
          <input type="file" onChange={(e)=>setFile(e.target.files[0])}/><br/>
          <input type="text" placeholder="produnct name..." value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/>
          <input type="text" placeholder="price..." value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/><br/>
          <input type="text" placeholder="category..." value={productCategory} onChange={(e)=>setProductCategory(e.target.value)}/><br/>
          <input type="text" placeholder="company name..." value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/><br/>
          <button onClick={addProduct}>Add Product</button>
        </div>
      </div>
    </>
  )
}
