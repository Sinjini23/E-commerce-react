import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      mobile: '',

      // Add other fields as needed
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/register', {
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        
      });
  
      console.log(response.data);
  
      // Check if the response contains the "User Already Present" message
      if (response.data.message === 'User Already Present') {
        alert('User created successfully!');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle other errors or show an error message to the user
    }
  };
  



  render() {
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
              <input type="text" className="form-control input-sm" placeholder="Search..." />
              <span className="input-group-btn">
                <button className="btn btn-primary btn-sm" type="button">
                  Search
                </button>
              </span>
            </div>
          </ul>
        </nav>
        <div className="container">
          {/* Personal Information Form */}
          <div className="container" style={{ marginTop: '20px' }}>
            <h2>Personal Information</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email address" />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number:</label>
                <input type="tel" className="form-control" id="mobile" placeholder="Enter your mobile number" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" className="form-control" id="address" placeholder="Enter your address" />
              </div>
              <div className="form-group">
                <label htmlFor="address2">Address 2:</label>
                <input type="text" className="form-control" id="address2" placeholder="Enter your address (optional)" />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6" style={{ paddingLeft: '0px' }}>
                  <label htmlFor="city">City:</label>
                  <input type="text" className="form-control" id="city" placeholder="Enter your city" style={{ marginRight: '15px' }} />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="state">State:</label>
                  <select className="form-control" id="state">
                    <option value="" selected disabled>
                      Select your state
                    </option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="zip">Zip:</label>
                  <input type="text" className="form-control" id="zip" placeholder="Enter your zip code" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-right">
                <button type="button" className="btn btn-primary" onClick={this.handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>






          {/* FAQ Section */}
          <div className="container" style={{ marginTop: '20px' }}>
            <h2>FAQ</h2>
            <div className="accordion" id="faqAccordion">
              <div className="card">
                <div className="card-header" id="question1">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      Q: When happens when I update my email address(or mobile number) ?
                    </button>
                  </h5>
                </div>
                <div id="collapse1" className="collapse show" aria-labelledby="question1" data-bs-parent="#faqAccordion">
                  <div className="card-body">
                    A: Your login email-id (or mobile number) changes likewise.You will receive allyour account related communication on your updated email-address (or mobile number).
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="question2">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse2"
                      aria-expanded="true"
                      aria-controls="collapse2"
                    >
                      Q: When my Flipkart email address will be upadted with the new email address (or mobile number)?
                    </button>
                  </h5>
                </div>
                <div id="collapse2" className="collapse show" aria-labelledby="question2" data-bs-parent="#faqAccordion">
                  <div className="card-body">
                    A: It happens as soon as you confirm the verification code sent to your email address (or mobile) and save the changes.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="question3">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="true"
                      aria-controls="collapse3"
                    >
                      Q: What happens to my existing Flipkart account when I update my email address ?
                    </button>
                  </h5>
                </div>
                <div id="collapse3" className="collapse show" aria-labelledby="question3" data-bs-parent="#faqAccordion">
                  <div className="card-body">
                    A: Updating your email address (or mobile number) does not invalidate your account.Your account remains fully functional.You'll continue seeing your Order History,saved information and personal details.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="question4">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse4"
                      aria-expanded="true"
                      aria-controls="collapse4"
                    >
                      Q:Does my seller account get affected when I update my email address ?
                    </button>
                  </h5>
                </div>
                <div id="collapse4" className="collapse show" aria-labelledby="question4" data-bs-parent="#faqAccordion">
                  <div className="card-body">
                    A: Flipkart has a single 'sign-on' policy. Any changes will reflect on your seller account also.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MyAccount;

