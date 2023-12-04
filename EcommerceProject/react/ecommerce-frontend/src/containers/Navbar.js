import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductList from '../Component/product/ProductList'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  const [cart, setCarts] = useState([])
  const localAuth = JSON.parse(localStorage.getItem("auth"))

  useEffect(() => {
    axios.get(`http://localhost:5000/cart`)
      .then((res) => {
        setCarts(res.data)
      })
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid" >
          <a className="navbar-brand"><img src='https://e7.pngegg.com/pngimages/480/581/png-clipart-logo-e-commerce-digital-marketing-brand-trade-ecommerce-text-service.png' width='200'></img></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            {localAuth ? (
              <ul className="navbar-nav ms-auto" style={{ alignItems: 'center' }}>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/product-update">Update Products </Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/add">Add Products</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/">Category</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/cart">Cart</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to='/logout'><img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' width='40' alt="user-icon" /> {localAuth.user}</Link></a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link"><Link to="/">Category </Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to='/signin'>Signin</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/cart"> <p><FontAwesomeIcon icon={faCartShopping} /> {cart.length}</p></Link></a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
