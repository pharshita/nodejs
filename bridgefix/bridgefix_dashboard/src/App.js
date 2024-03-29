import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';
import SideNavBar from './Component/SideNavBar/SideNavBar';
import Employees from './Component/Employees/Employees';
import Leave from './Component/Leave/Leave';
import Status from './Component/Status/Status';
import Payroll from './Component/Payroll/Payroll';
import StatusID from './Component/Status/StatusID';
import LoginPage from './Component/Login_page/LoginPage';

function App() {
  const location = useLocation();

  return (
    <div className="App" >
        <div style={{ display: 'flex' }}>
          <div style={{width: location.pathname === "/" ? "0%" : "15%",   backgroundColor: '#12646c'}}>
            <SideNavBar />
          </div>
          <div style={{ width: location.pathname === "/" ? "100%" : "85%" }}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/status" element={<Status />} />
              <Route path="/status/:id/" element={<StatusID />} />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
