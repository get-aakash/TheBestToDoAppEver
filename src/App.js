import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import ForgetPassword from './pages/ForgetPassword';



function App() {
 
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Registration />} />
      <Route path='/password-reset' element={<ForgetPassword />} />
      
      <Route path='dashboard' element={
      <PrivateRoute>
        <Dashboard />

      </PrivateRoute>}/>
      

    </Routes>
      </BrowserRouter>
    
    <ToastContainer />
    </div>
  );
}

export default App;
