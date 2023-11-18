import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, json } from 'react-router-dom';


function Navbar() {
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    const userFromlocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
    setUserdata(userFromlocalStorage);
  }, [])

  return (
    <div className='nav-container'>
      <Link to='/'className='logo' >FashionHub</Link>

      <div>
      <Link to="/orders" className='nav-btn'>My Orders</Link>
        <Link to="/signup" className='nav-btn'>Signup</Link>
        <Link to="/login" className='nav-btn'>Login</Link>
        
      </div>

      <div>
        Hay!😊{userdata.name}

        {
          userdata?.name? (<button className='btn-logout'
          onClick={()=>{
            localStorage.removeItem("user");
            window.location.href = "/login"
          }}
          >Logout</button>) : null
        }
      </div>

    </div>
  )
}

export default Navbar
