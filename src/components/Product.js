import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ProductAdmin extends Component {
  state = {
    isEditMode: false,
    updatedproductname: this.props.productInfo.name,
  };

  handleProductEdit = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  };

  handleEditSave = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(
      this.props.productInfo.eventId,
      this.state.updatedproductname
    );
  };

  onAddProductNameChange = (event) =>
    this.setState({ updatedproductname: event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        <a
          href="/"
          onClick={this.handleProductEdit}
          className="product-edit-icon"
        >
          <FontAwesomeIcon icon="edit" />
        </a>
        <button
          onClick={(event) =>
            this.props.handleDeleteProduct(this.props.productInfo.id, event)}
          className="delete"
        />
        {this.state.isEditMode ? (
          <div>
            <p>Edit product name</p>
            <input
              className="input is-medium"
              type="text"
              placeholder="Enter name"
              value={this.state.updatedproductname}
              onChange={this.onAddProductNameChange}
            />
            {/* <p className="product-id">
              Event:
              {this.props.id}
            </p> */}
            <button
              type="submit"
              className="button is-info is-small"
              onClick={this.handleEditSave}
            >
              save
            </button>
          </div>
        ) : (
            <div>
              <p className="event-title">{this.props.productInfo.name}</p>
              <p className="event-info">
                Status : {this.props.productInfo.status}
              </p>
              <p className="event-info">
                Description : {this.props.productInfo.description}
              </p>
              <p className="event-info">
                Start Time : {this.props.productInfo.start_time}
              </p>
              <p className="event-info">
                Stop Time : {this.props.productInfo.stop_time}
              </p>
            </div>
          )}
      </div>
    );
  }
}
