import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import axios  from 'axios';
import './MyOrders.css';
import { Link } from 'react-router-dom';

const STATUS_BADAGE_COLOUR_MAP = {
  "pending" : "badge-danger",
  "shipped": "badge-warning",
  "delivered": "badge-success"
}

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const localStoragedata = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log(localStoragedata);

  const loadData = async () => {
    const response = await axios.get(`/orders/user/${localStoragedata?._id}`)
    setOrders(response?.data?.data)
    console.log(response?.data?.data)
  }

  useEffect( () => {
    loadData()
  }, [])

  return (
<>
<Navbar/>
    <div>

      
<h3>User ID :{localStoragedata._id}</h3>
      {
        orders.map((order, i) => {
          const {product, shipingaddress, quentity, status,deliverycharge} = order;
          return(
            <>
            <div className='order-container'>
            <h3>{product.title}</h3>
            <p>Address: {shipingaddress} </p>
            <span>Price: {product.price}</span> <span>Quentity: {quentity}</span> <span>Deliverycharge: {deliverycharge}</span>
            <p>Total Pay Amount: {(product.price * quentity)+ deliverycharge} </p>
            <span className={`status-order ${STATUS_BADAGE_COLOUR_MAP[status]}`}>{status}</span>
            
            </div>
            </>
          )
        })
      }
    </div>
</>
  )
}

export default MyOrders;
