import React, { Component } from 'react';
import './App.css';
// import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends Component {
    onToken = (token) => {
        fetch('/save-stripe-token', {
          method: 'POST',
          body: JSON.stringify(token),
        }).then(response => {
          response.json().then(data => {
            alert(`We are in business, ${data.email}`);
          });
        });
      }
     
      // ...
     
      render() {
        return (
          // ...
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_l9vx2AwL6Ii563SGjZFb4nhF"
          />
        )
      }
}

export default Checkout;