import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import UserList from './pages/UserList';
import './index.css';
import Weather from './Projects/Weather';
import ForgetPassword from './components/FogetPassword';
import ResetPass from './components/ResetPass';
import Verify from './components/Verify';
function App() {

  let userType = localStorage.getItem("userType");
  console.log(userType);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  };
  const AdminRoute = ({ element }) => {
    return userType === "Admin" ? element : <Navigate to="/home" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Weather/>} />} />
        {/* <Route path='/weather' element={<Weather />} /> */}
        <Route path="/users" element={<AdminRoute element={<UserList />} />} />

        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPass />} />
        <Route path="/verify/:token" element={<Verify />} />

      </Routes>
    </div>
  );
}

export default App;
