import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Event extends Component {
  state = {
    isEditMode: false,
    eventInfo: this.props.eventInfo,
  };

  handleEditSave = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: false });
  };

  render() {
    return (
      <div className="tile is-child box notification is-success">
        <a className="product-edit-icon">
          <FontAwesomeIcon icon="edit" />
        </a>
        {/* {this.state.isEditMode ? (
          <div>
            <p>Edit product name</p>
            <input
              className="input is-medium"
              type="text"
              placeholder="Enter name"
              value={this.state.updatedproductname}
              onChange={this.onAddProductNameChange}
            />
            <p className="product-id">
              Event:
              {this.props.id}
            </p>
            <button
              type="submit"
              className="button is-info is-small"
              onClick={this.handleEditSave}
            >
              save
            </button>
          </div>
        ) : ( */}
        <div>
          <p className="event-title">{this.props.eventInfo.name}</p>
          <p className="event-info">
            Status :
            {this.props.eventInfo.status}
          </p>
          <p className="event-info">
            Description : 
            {' '}
            {this.props.eventInfo.description}
          </p>
          <p className="event-info">
            Start Time : 
            {' '}
            {this.props.eventInfo.start_time}
          </p>
          <p className="event-info">
            Stop Time : 
            {' '}
            {this.props.eventInfo.stop_time}
          </p>
        </div>
        {/* )} */}
      </div>
    );
  }
}
