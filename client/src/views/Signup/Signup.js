import React, { useState }  from "react";
import "./Signup.css"

import axios from "axios"

const SignUP =  ()=>{
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [mobile , SetMobile] = useState("")
    const [address , setAddress] = useState("")
    const [gender , setGender] = useState("Male")

    const signup = async ()=>{
        if(!name){
            alert("Name is Requered");
            return;
        }
        if(!email){
            alert("Email is Requered");
            return;
        }
        if(!mobile){
            alert("Mobile is Requered");
            return;
        }
        if(!address){
            alert("Address is Requered");
            return;
        }
        if(!password){
            alert("Password is Requered");
            return;
        }
       
        try{
            const response = await axios.post("/signup" , {
                name : name,
                address : address ,
                email : email,
                mobile : mobile,
                password: password,
                gender : gender,
            })
    
            alert(response?.data?.message);
    
            if(response?.data?.success){
                window.location.href = "/login"
            }
        }
        catch(err){
            console.log(err.message);
        }
        }
       
       

    return (
        <div>
        <form  className="signup-form">
            <h1>SignUp</h1>
            <div className="InputBox-container">

                <div>
                <label htmlfor="name">Name</label>
                <input type="text" 
                placeholder="Enter Your Name"  
                className="input-box"
                id= "name"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}
                 />
                </div>
               
                <div>
                <label htmlfor="name">Email</label>
                <input type="text" 
                placeholder="Enter Your Email"  
                className="input-box"
                id= "email"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                 />
                </div>
                <div>
                <label htmlfor="mobile">mobile</label>
                <input type="text" 
                placeholder="Enter Your moble"  
                className="input-box"
                id= "mobile"
                value={mobile}
                onChange={(e)=>{
                    SetMobile(e.target.value);
                }}
                 />
                </div>
                
               <div>
               <label htmlfor="name">address</label>
                <input type="text" 
                placeholder="Enter Your Address"  
                className="input-box"
                id= "address"
                value={address}
                onChange={(e)=>{
                    setAddress(e.target.value);
                }}
                 />
               </div>
               <div>
               <label htmlfor="password">Password</label>
                <input type="appword" 
                placeholder="Enter Your Name"  
                className="input-box"
                id= "password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                 />
               </div>
               <div>
                <label>Male</label>
                <input type = "radio" 
                 id = "male" 
                name="gender" 
                checked={gender === "male"}
                onClick={()=>{
                    setGender("male")
                }}
                />
                <label>Female</label>
                <input type = "radio"  
                id = "female" 
                name="gender"  
                checked={gender === "female" }
                onClick={()=>{
                    setGender("female")
                }}
                />
               </div>

               <button type="button" 
               className="submit-btn" 
               onClick={signup}
               > SignUP</button>

            </div>
              
            
        </form>
        </div>
    );

  } 
 
  export default SignUP;