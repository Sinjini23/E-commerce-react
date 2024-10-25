// ProductCard.js
import React, { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async () => {
    setIsAdding(true);

    const itemToAdd = {
      ...product,
      quantity,
      totalPrice: product.price * quantity,
    };
    addToCart(itemToAdd);

    // Simulate an API request or perform other necessary actions
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsAdding(false);
   
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="col-sm-4">
      <div className="panel panel-primary">
        <div className="panel-body">
          <img
            src={product.images}
            className="img-responsive card-img"
            style={{ width: '100%' }}
            alt={product.title}
          />
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-md-8">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column align-items-end">
                <span className="price">{`$${product.price}`}</span>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="quantity-control">
              <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
            <p>Total Price: ${product.price * quantity}</p>
            <button onClick={handleClick} disabled={isAdding}>
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
            {isAdding && <span style={{ marginLeft: '5px' }}>Added to Cart!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
