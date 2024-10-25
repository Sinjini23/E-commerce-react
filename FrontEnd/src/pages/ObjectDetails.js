import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ObjectDetails.css'; // Import the CSS file

const ObjectDetails = () => {
  const { ObjectId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/product/${ObjectId}`);
        setProduct(response.data.getaProduct);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProductDetails();
  }, [ObjectId]);

  const addToCart = () => {
    setCart([...cart, { ...product, quantity }]);
    setQuantity(1);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10)) || 1;
    setQuantity(newQuantity);
  };

  const goToCheckout = () => {
    // Log the cart state before navigating
    console.log('Cart:', cart);

    // Include the current product details with the updated quantity in the cart
    navigate('', { state: { cart: [...cart, { ...product, quantity }] } });
  };
  const handleBuyNowClick = () => {
    
    alert("Product Added Successfully");
  };

  return (
    <div className="container">
      {product ? (
        <div className="product-container">
          <div className="image-container">
            <img src={product.images} alt={product.title} className="image" style={{ width: '70%' }} />
          </div>
          <div className="details-container">
            <h2 className="title">{product.title}</h2>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <div className="details">
              <h3>Specifications</h3>
            {product.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
            <div className="quantity-container">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
            </div>
            <button className="buy-now-btn" onClick={handleBuyNowClick}>
           Add To Cart
        </button>
            <div className="reviews">
            <h3>Reviews:</h3>
            {product.reviews.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ObjectDetails;
