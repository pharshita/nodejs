import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faCartShopping, faTrashCan, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Category.css'

export default function AddToCart() {
    const { productId } = useParams();
    const [categoryProduct, setCategoriesProduct] = useState([])
    const [cart, setCarts] = useState([])
    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:5000/product-category/categoryId/${productId}`)
                .then((res) => {
                    setCategoriesProduct(res.data)
                })
        }
        getCartApi()
    }, [])

    const getCartApi = () => {
        debugger
        axios.get(`http://localhost:5000/cart`)
            .then((res) => {
                setCarts(res.data)
            })
    }
    const deleteCart = (id) => {
        axios.delete(`http://localhost:5000/cart/${id}`)
            .then((res) => {
                getCartApi()
            })
    }
    const updateCartDataplus = (data) => {
        let obj = {
            Number: data.Number + 1,
            category: data.category,
            company: data.company,
            name: data.name,
            price: data.price,
            userId: data.userId,
        }
        axios.patch(`http://localhost:5000/cart/${data._id.toString()}`, obj)
            .then((res) => {
                getCartApi()
            })
    }
    const updateCartData = (data) => {
        let obj = {
            Number: data.Number - 1,
            category: data.category,
            company: data.company,
            name: data.name,
            price: data.price,
            userId: data.userId,
        }
        axios.patch(`http://localhost:5000/cart/${data._id.toString()}`, obj)
            .then((res) => {
                if(res.data.Number==0){
                    deleteCart(data._id.toString())
                }
                getCartApi()
            })
    }

    return (
        <div className='cartSummery'>

            <div className='' style={{ display: "flex", justifyContent: "space-around" }}>
                <div> <Link to='/'><FontAwesomeIcon icon={faArrowLeftLong} /> <span style={{ color: 'black' }}>Continue shopping</span></Link> </div>
                <h6> Cart summary </h6>
                <div>
                    <p><FontAwesomeIcon icon={faCartShopping} /> {cart.length}</p>
                </div>
            </div>
            {
                cart.length !== 0
                    ? cart.map((cartItem, index) => {
                        debugger
                        return (
                            <div className='row' style={{ background: "white", margin: "100px", padding: "50px" }}>
                                <div className='col-lg-4 col-md-4 col-sm-12' style={{ display: "flex", justifyContent: "space-around" }}>
                                {cartItem.fileDetails && cartItem.fileDetails.path ? (
                                                <img src={`http://localhost:5000/${cartItem.fileDetails.path}`} width='150px' alt='Product' />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                    {/* <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprBnU9cgYs7zKmrfliadgR4qJZY1mW36MoQ&usqp=CAU' width="150px" /></div> */}
                                    <div>
                                        <h3>{cartItem.name}</h3><br />
                                        <p style={{ textAlign: "left" }}>&#8377;{cartItem.price}</p>
                                    </div>

                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                </div>
                                <div className='col-lg-2 col-md-2 col-sm-12' style={{ textAlign: "right" }}>
                                    <FontAwesomeIcon icon={faTrashCan} color='red' onClick={() => deleteCart(cartItem._id.toString())} />
                                    <div style={{ textAlign: "left" }}>
                                        <label>Quantity</label>
                                        <div style={{ border: "1px solid blue", display: "flex", alignItems: "center", justifyContent: "space-around", width: "70%" }} className='mt-2'>
                                            <FontAwesomeIcon icon={faMinus} id='minus' onClick={(e) => updateCartData(cartItem)} />
                                            <h6>{cartItem.Number}</h6>
                                            <FontAwesomeIcon icon={faPlus} id='plus' onClick={(e) => updateCartDataplus(cartItem)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :  null
            }
        </div>
    )
}
