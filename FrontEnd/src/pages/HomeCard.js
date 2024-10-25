// HomeCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './HomeCard.css'; // Import the CSS file
import Rating from './Rating';

const HomeCard = ({ product, addToCart }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleTitleClick = () => {
    setIsClicked(true);
    
  };

  const handleAddToCart = () => {
    addToCart(product);
    
  };

  return (
    <div className="col-sm-4">
      <div className={`panel panel-primary ${isClicked ? 'title-clicked' : ''}`}>
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
              <h5 className="card-title">
                <Link
                  to={`/product/${product._id}`}
                  className="title-link"
                  onClick={handleTitleClick}
                >
                  {product.title}
                </Link>
              </h5>
              <p className="card-text">
                {product.description}
              </p>

              <Rating value={product.rating} />

            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column align-items-end">
                <span className="price">{`$${product.price}`}</span>
                <div className="reviews">
                  <p>{product && product.reviews && `${product.reviews.length} reviews`}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

HomeCard.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default HomeCard;
