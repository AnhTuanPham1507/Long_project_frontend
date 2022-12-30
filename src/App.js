import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const token = useSelector(state => state.token.value)  
  const navigate = useNavigate()

  useEffect(() => {
    if(!token)
      navigate("/login")
  },[token, navigate])

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
