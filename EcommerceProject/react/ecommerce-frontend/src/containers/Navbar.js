import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link " ><Link to="/" >Home</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link "><Link to="/products">Products </Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link "><Link to="/add">Add Produncts</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link "><Link to="/update">Update Produncts</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link "><Link to="/logout">Logout</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link "><Link to="/profile">profile</Link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
