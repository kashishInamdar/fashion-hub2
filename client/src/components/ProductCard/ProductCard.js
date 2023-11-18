import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ id, image, name, description, price}) {

  return (
    <div>
      <div className="productcard-container">
        <img className="product-img" src={image} />
        <div className='product-details'>
          <h3 className='product-name'> {name} </h3>
          <p className="product-description"> {description} </p>
          <p className="product-price">₹{price}</p>
        </div>
        <Link to={`/buy/${id}`} className=" buy-btn">Buy Now</Link>
      </div>
    </div>
  )
}

export default ProductCard
