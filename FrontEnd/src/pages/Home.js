
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch product data when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product');
        setProducts(response.data); 
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const AddtoCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
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
            <NavLink to="/whatsnew" className="btn btn-whats-new">
              Whats New
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/special" className="btn btn-specials">
              Specials
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
      </div>

      </ul>
      </nav>

      <div className="container">

        <div className="masthead">

          <div id="myCarousel" className="carousel slide" data-ride="carousel">

            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>

            {/* Wrapper for slides */}
            <div className="carousel-inner">
              <div className="item active">
                <img src="../Images/Carousal3.jpg" alt="Slide 1" className="img-responsive" style={{ width: '100%', height: '400px' }} />
              </div>
              <div className="item">
                <div className="mask flex-center" style={{ backgroundColor: '#001F3F', color: '#ffffff', height: '400px' }}>
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-md-7 col-12 order-md-1 order-2">
                        <div className="text-center">
                          <h4 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Charge Smart & Charge Fast</h4>
                          <div className="line" style={{ height: '2px', backgroundColor: '#007bff', marginBottom: '20px' }}></div>
                          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
                            Get your own Laptop Today at Minimum Discount. Order Now!
                          </p>
                          <a href="/product/65a93dc1fbea81f317c8b2c4" className="btn btn-primary btn-lg">
                            BUY NOW
                          </a>
                        </div>
                      </div>
                      <div className="col-md-5 col-12 order-md-2 order-1">
                        <img
                          src="../Images/Carousal5.png"
                          alt="slide 2"
                          className="img-responsive"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          <div className="container" style={{ marginTop: '20px' }}>
            <div className="row">
              <div className="col-md-3">
                <ul className="nav nav-pills nav-stacked" role="tablist">
                  <li className="nav-item active">
                    <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Featured Item</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Bestseller</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Summer Discount</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Premium Product</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="v-pills-idea-tab" data-toggle="pill" href="#v-pills-idea" role="tab" aria-controls="v-pills-idea" aria-selected="false">Gift Idea</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9 ">
                <div className="tab-content bg-primary">
                  <div className="tab-pane fade active in" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <div className="row">
                      <div className="col-md-6 text-justify">
                      <h3 style={{ fontSize: '2em', marginBottom: '10px', color: 'white', textDecoration: 'underline', paddingLeft: '10px' }}>GREAT NEWS!!</h3>

      <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: 'white', marginBottom: '20px',paddingLeft: '10px' }}>
      Discover our carefully curated selection of featured items, designed to elevate your lifestyle and meet your needs. Our featured items showcase the perfect blend of style, functionality, and innovation, making them stand out from the rest.
      </p>
      <p style={{ marginLeft: '10px', textAlign: 'right' }}>
                          <a
                            href="#"
                            className="btn btn-primary"
                            onClick={toggleModal}
                            style={{ border: '1px solid white', color: 'black', backgroundColor: 'white'}}
                          >
                            Read More
                          </a>
                        </p>
                      </div>
                      <div className="col-md-6 text-right">
                        <img src="../Images/Featured Item.png" alt="Featured Item Image" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
                      </div>
                    </div>
                  </div>

                  {/* Modal */}
                  {showModal && (
  <div className="modal show" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content custom-modal">
        <div className="modal-header" style={{ backgroundColor: '#FFD700', color: 'black' }}>
          <h2 className="modal-title" style={{ color: 'red' }}>SALE IS LIVE!!</h2>
          <button type="button" className="close" onClick={toggleModal} aria-label="Close" style={{ color: 'white', fontWeight: 'bold'}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p style={{ color: 'green' }}>Recently Launched Samsung Galaxy S21 is on sale. HURRY! BUY NOW!</p>
        </div>
        <div className="modal-footer" style={{ backgroundColor: '#FFD700' }}>
          <button type="button" className="btn btn-secondary" onClick={toggleModal} style={{ color: 'black' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

<div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
  <div className="row">
    <div className="col-md-6">
      <div className="bestseller-content">
      <p className="bestseller-description" style={{ textAlign: 'right' }}>
  <h3>SEE OUR PRODUCTS SECTIONS</h3>
</p>  
<Link to="/product" className="btn btn-primary bestseller-btn" style={{ backgroundColor: 'white', color: 'black' }}>
          See More
        </Link>
      </div>
    </div>
    <div className="col-md-6 text-right">
      <img src="../Images/Best Seller.png" alt="Bestseller Item Image" className="img-fluid bestseller-image" />
    </div>
  </div>
</div>

                  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <p>Description for Summer Discount goes here. This is a summer discount product.</p>
                      </div>
                      <div className="col-md-6 text-right">
                        <img src="../Images/SummerDiscount.jpg" alt="Summer Discount Item Image" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <p>Description for Premium Product goes here. This is a premium product.</p>
                      </div>
                      <div className="col-md-6 text-right">
                        <img src="../Images/Premium.png" alt="Premium Product Image" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="v-pills-idea" role="tabpanel" aria-labelledby="v-pills-idea-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <p>Description for Gift Idea goes here. This is a gift idea product.</p>
                      </div>
                      <div className="col-md-6 text-right">
                        <img src="../Images/GiftIdea2.png" alt="Gift Idea Image" className="img-fluid" style={{ maxWidth: '45%', height: 'auto' }} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="container" style={{ marginTop: '25px' }}>
              <div className="row">
                {filteredProducts.map((product) => (
                  <HomeCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>


    </div>


  );
};




export default Home;
