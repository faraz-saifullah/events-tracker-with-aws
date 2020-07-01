import React, { Component, Fragment } from "react";
import axios from "axios";
import Product from "./Product";

const config = require("../config.json");

export default class Products extends Component {
  state = {
    newproduct: null,
    products: [],
  };

  fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/events?username=${this.props.auth.username}`);
      const products = res.data;
      console.log(products);
      this.setState({ products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  componentDidMount = async () => {
    setImmediate(() => {
      this.fetchProducts();
    })
  };

  render() {
    return (
      <>
        <section className="section">
          <div className="container">
            <h1>Your Events</h1>
            <p className="subtitle is-5">
              One stop destination for managing all your events efficiently
            </p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {this.state.products && this.state.products.length > 0 ? (
                      this.state.products.map((product) => (
                        <Product
                          productInfo={product}
                          key={product.eventId}
                        />
                      ))
                    ) : (
                        <div className="tile notification is-warning">
                          No events available
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
