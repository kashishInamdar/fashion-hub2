
import './BuyPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

function BuyPage() {

  const [product, setProduct] = useState({});
  const [quentity, setQuentity] = useState(1);
  const [deliverycharge, setDeliverycharge] = useState(60)
  const [shipingaddress, setShipingaddress] = useState("");

  const { id } = useParams();
  const loadOrder = async () => {
    try {
      const response = await axios.get(`/product/${id}`)
      setProduct(response?.data?.data)
    }
    catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [])

  const increment = () => {

    setQuentity(quentity + 1);
  }
  const decrement = () => {
    if (quentity === 1) {
      return;
    }
    setQuentity(quentity - 1);
  }


  const placeOrder = async () => {

    if (!shipingaddress) {
      return (
        alert("please enter shiping address")
      )

    }

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

    const orderDetails = {
      user: currentUser._id,
      product: id,
      quentity: quentity,
      shipingaddress: shipingaddress,
      deliverycharge: deliverycharge
    }

    const response = await axios.post("/order", orderDetails)
    alert(response.data.message)

    if (response?.data?.success) {
      window.location.href = '/orders';
    }
  }

  return (
    <div>
      <Navbar />
      <div className="buy-container">

        <div >
          <img className="img-buy" src={product?.image} />
        </div>

        <div className='m-5'>
          <h2> {product.title} </h2>
          <p className="card-description"> {product?.description} </p>
          <p>Brand : {product?.brand}</p>
          <p className="card-price">₹{product?.price}</p>

          <div className='quentity-container'>
            <span className='incr bor-l' onClick={decrement}>➖</span>
            <span className='quentity-num'> {quentity} </span>
            <span className='incr bor-R' onClick={increment}>➕</span>
          </div> 



          <input type='radio'
            id='normaldelivery'
            name='delivery'
            checked={deliverycharge === 60}
            value={deliverycharge}
            onClick={() => {
              setDeliverycharge(60);
            }}
          />
          <label htmlFor="normaldelivery"> Normal Delivery</label>


          <input type='radio'
            id='fastDelivery'
            name='delivery'
            className='delivery'
            checked={deliverycharge === 100}
            value={deliverycharge}
            onClick={() => {
              setDeliverycharge(100);
            }}
          />
          <label htmlFor="fastDelivery">Fast Delivery</label>

          <p>Delivery Charges: <h2 className='total-price'> ₹{deliverycharge} </h2></p>

          <p>Total Pay Amount: <h2 className='total-price'> ₹{(product.price * quentity) + deliverycharge}</h2></p>

          <input type='text' placeholder='Enter Your Current  Address'
            value={shipingaddress}
            className='input-box'
            onChange={(e) => {
              setShipingaddress(e.target.value)
            }}
          />



          <button className='buy-button' onClick={placeOrder}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default BuyPage
