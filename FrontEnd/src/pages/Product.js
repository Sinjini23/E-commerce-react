import React, { useEffect, useState } from 'react';
import { NavLink, Link} from 'react-router-dom';
import axios from 'axios';
import ProductCard from './productCard';
import Cart from './Cart';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product');
        console.log(response.data);
        setProducts(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const AddtoCart = ({ product, cart, setCart }) => {
    const handleAddToCart = () => {
      setCart([...cart, product]);
    }
  };
  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase().trim();
  
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        // Check if product, product.name, and product.name is not blank before calling toLowerCase()
        if (product && product.title && product.title.trim() !== '') {
          return product.title.toLowerCase().includes(searchTerm);
        }
        return false;
      });
  
      setFilteredProducts(filtered);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };


    
  return (
    <div>
      <nav style={{ marginTop: '10px', backgroundColor: '#e0e0e0' }}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to="/home" className="btn btn-home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/product" className="btn btn-product">
              Product
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/my-account" className="btn btn-my-account">
              My Account
            </NavLink>
          </li>

          <div className="input-group mb-2" style={{ float: 'right', width: '25%' }}>
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleSearchButtonClick}
              >
                Search
              </button>
            </span>
            <Link to="/cart" className="btn btn-primary mb-2 btn-sm pull-right mr-1">
  <span className="glyphicon glyphicon-shopping-cart"></span> Cart
         </Link>

          </div>
        </ul>
      </nav>
      <div className="container" style={{ marginTop: '25px' }}>
        <div className="row">
          {products.map((product) => (
            <ProductCard
            key={product.title}
            product={product}
            addToCart={AddtoCart} 

          />
          ))}
        </div>
      </div>
      
    
    </div>
  );
};
























          {/* Second Box */}
          {/* < div className="col-sm-4" >
            <div className="panel panel-primary">
              <div className="panel-body">
                <img
                  src="https://placehold.it/150x80?text=IMAGE"
                  className="img-responsive"
                  style={{ width: '100%' }}
                  alt="Image"
                />
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-8">
                    <h5 className="card-title">Product B</h5>
                    <p className="card-text">
                      Description for Product B. Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                    </p>
                    <div className="d-flex align-items-center">
                      <span className="mr-1">Rating:</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex flex-column align-items-end">
                      <span className="price">$149.99</span>
                      <div className="reviews">
                        <p>22 reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>

          </div> */}

          {/* Third Box */}
          {/* <div className="col-sm-4">
            <div className="panel panel-primary">
              <div className="panel-body">
                <img
                  src="https://placehold.it/150x80?text=IMAGE"
                  className="img-responsive"
                  style={{ width: '100%' }}
                  alt="Image"
                />
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-8">
                    <h5 className="card-title">Product B</h5>
                    <p className="card-text">
                      Description for Product B. Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                    </p>
                    <div className="d-flex align-items-center">
                      <span className="mr-1">Rating:</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex flex-column align-items-end">
                      <span className="price">$149.99</span>
                      <div className="reviews">
                        <p>22 reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#" className="btn btn-primary">
                  Add to Cart
                </a>
              </div>
            </div>
          </div> */}
//         </div>
//         <div className="row">
//           {/* First Box */}
//           <div className="col-sm-4">
//             {/* Your panel content for Product A */}
//             <div className="panel panel-primary">
//               <div className="panel-body">
//                 <img
//                   src="https://placehold.it/150x80?text=IMAGE"
//                   className="img-responsive"
//                   style={{ width: '100%' }}
//                   alt="Image"
//                 />
//               </div>
//               <div className="panel-footer">
//                 <div className="row">
//                   <div className="col-md-8">
//                     <h5 className="card-title">Product A</h5>
//                     <p className="card-text">
//                       Description for Product A. Some quick example text to build on the card title and make up the bulk
//                       of the card's content.
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <span className="mr-1">Rating:</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="d-flex flex-column align-items-end">
//                       <span className="price">$99.99</span>
//                       <div className="reviews">
//                         <p>22 reviews</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <a href="#" className="btn btn-primary">
//                   Add to Cart
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Second Box */}
//           <div className="col-sm-4">
//             <div className="panel panel-primary">
//               <div className="panel-body">
//                 <img
//                   src="https://placehold.it/150x80?text=IMAGE"
//                   className="img-responsive"
//                   style={{ width: '100%' }}
//                   alt="Image"
//                 />
//               </div>
//               <div className="panel-footer">
//                 <div className="row">
//                   <div className="col-md-8">
//                     <h5 className="card-title">Product B</h5>
//                     <p className="card-text">
//                       Description for Product B. Some quick example text to build on the card title and make up the bulk
//                       of the card's content.
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <span className="mr-1">Rating:</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="d-flex flex-column align-items-end">
//                       <span className="price">$149.99</span>
//                       <div className="reviews">
//                         <p>22 reviews</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <a href="#" className="btn btn-primary">
//                   Add to Cart
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Third Box */}
//           <div className="col-sm-4">
//             <div className="panel panel-primary">
//               <div className="panel-body">
//                 <img
//                   src="https://placehold.it/150x80?text=IMAGE"
//                   className="img-responsive"
//                   style={{ width: '100%' }}
//                   alt="Image"
//                 />
//               </div>
//               <div className="panel-footer">
//                 <div className="row">
//                   <div className="col-md-8">
//                     <h5 className="card-title">Product B</h5>
//                     <p className="card-text">
//                       Description for Product B. Some quick example text to build on the card title and make up the bulk
//                       of the card's content.
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <span className="mr-1">Rating:</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                       <span className="star">&#9733;</span>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="d-flex flex-column align-items-end">
//                       <span className="price">$149.99</span>
//                       <div className="reviews">
//                         <p>22 reviews</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <a href="#" className="btn btn-primary">
//                   Add to Cart
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div >
//   )
// }

export default Product