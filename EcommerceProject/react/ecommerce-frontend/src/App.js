import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './containers/Navbar';
import Products from './Component/Products';
import Footer from './containers/Footer';
import AddProducts from './Component/AddProducts';
import Home from './Component/Home';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/products' element={<Products/>}></Route>
     <Route path='/add' element={<AddProducts/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
