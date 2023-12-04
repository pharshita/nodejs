import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './Component/lohinuser/Signin';
import Logout_user from './Component/lohinuser/Logout_user';
import AddProducts from './Component/product/AddProducts';
import Navbar from './containers/Navbar';
import ProductList from './Component/product/ProductList';
import Category from './Component/Category/Category';
import AddToCart from './Component/Category/AddToCart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Category />}></Route>
          <Route path='/product-update' element={<ProductList/>}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/add' element={<AddProducts />}></Route>
          <Route path='/logout' element={<Logout_user />}></Route>
          <Route path='/cart' element={<AddToCart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
