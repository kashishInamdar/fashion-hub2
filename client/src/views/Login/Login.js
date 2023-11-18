import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const logindata = async () => {

    const user = {email,
      password
    }

    try{
      const response = await axios.post("/login", user)

      alert(response?.data?.message)
  
      if (response?.data?.success) {
        localStorage.setItem('user', JSON.stringify(response?.data?.data));
        window.location.href = "/";
      }
    }
    catch(e) {
console.log(e.message)
    }
   
  }

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}" );

    if(storedUser?.email){
      alert("you are already logged in!");
      window.location.href = "/"
    }
  },[])

  return (
    <>
    <div className='signup-form'>
      <h1 className='text-center'>login</h1>

      <div>
          <label htmlFor="email">Email :</label><br />
          <input type='text'
            placeholder='Enter your Enail'
            className='input'
            id='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label><br />
          <input type='password'
            placeholder='Enter your Password'
            className='input'
            id='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      <div className='text-center'>
      <button type='button' onClick={logindata}   className='btn m-3'> Login </button>
      </div>

      <Link to={"/signup"} className='link-form'>Creat a new Account? </Link>

    </div>


    </>
  )
}

export default Login
