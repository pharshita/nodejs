import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import './Category.css'
import { Link, useNavigate } from 'react-router-dom';

function Category() {
    const [selectCategory, setSelectCategory] = React.useState('');
    const [categories, setCategories] = React.useState([])
    const [categoriesProduct, setCategoriesProduct] = React.useState([])
    const [productList, setProductList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:5000/product-category")
            .then((res) => {
                setCategories(res.data)
            })
        axios.get('http://localhost:5000/add-product')
            .then((res) => {
                setProductList(res.data)
            })
    }, [])

    const handleChange = (event) => {
        setSelectCategory(event.target.value);
        if (event.target.value == "") {
            setCategoriesProduct("")
        }
        else {
            axios.get(`http://localhost:5000/product-category/${event.target.value}`)
                .then((res) => {
                    setCategoriesProduct(res.data)
                })
        }
    };

    const handlecarts = (id) => {
        axios.post(`http://localhost:5000/cart/${id}`)
            .then((res) => {
                console.log("data added")
                navigate(`/cart`)
            })
    }
    return (
        <div className='container'>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 420 }}>
                <InputLabel >Category List</InputLabel>
                <Select
                    style={{ textAlign: 'left' }}
                    value={selectCategory}
                    onChange={(event) => handleChange(event)} >
                    <MenuItem value="">default value</MenuItem>
                    {
                        categories.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <div className='row cardStyle'>
                {
                    categoriesProduct.length !== 0
                        ? categoriesProduct.map((product, index) => {
                            return (
                                <>
                                    <div className='col-sm-3 card'>
                                        <div className='p-3'>
                                            {product.fileDetails && product.fileDetails.path ? (
                                                <img src={`http://localhost:5000/${product.fileDetails.path}`} width='150px' alt='Product' />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                            <h2>{product.name}</h2>
                                            <p>{product.company}</p>
                                            <h5>&#x20B9; {product.price}</h5>
                                            <button className='btn btn-dark' onClick={() => handlecarts(product._id.toString())}>Add To Cart</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        :
                        productList.map((product, index) => {
                            return (
                                <>
                                    <div className='col-sm-2 card'>
                                        <div className='p-3'>
                                            {product.fileDetails && product.fileDetails.path ? (
                                                <img src={`http://localhost:5000/${product.fileDetails.path}`} width='150px' alt='Product' />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                            <h2>{product.name}</h2>
                                            <p>{product.company}</p>
                                            <h5>&#x20B9; {product.price}</h5>
                                            <button className='btn btn-dark' onClick={() => handlecarts(product._id.toString())}>Add To Cart</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Category
