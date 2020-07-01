import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditMode: false,
      updateEventInfo: this.props.eventInfo,
    };
  }

  handleEventEdit = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  };

  handleEditSave = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: false });
  };

  onAddEventNameChange = (event) =>
    this.setState({ updatedproductname: event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        <a
          href="/"
          onClick={this.handleEventEdit}
          className="event-edit-icon"
        >
          <FontAwesomeIcon icon="edit" />
        </a>
        <button
          // onClick={(event) =>
          //   this.props.handleDeleteProduct(this.props.productInfo.id, event)}
          className="delete"
        />
        {/* {this.state.isEditMode ? (
          <div>
            <p>Edit event info</p>
            <input
              className="input is-medium"
              type="text"
              placeholder="Enter name"
              value={this.state.updatedproductname}
              onChange={this.onAddEventNameChange}
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
              Update
            </button>
          </div> */}
        {/* ) : ( */}
        <div>
          <p className="event-title">{this.props.eventInfo.name}</p>
          <p className="event-info">
            Status : {this.props.eventInfo.status}
          </p>
          <p className="event-info">
            Description : {this.props.eventInfo.description}
          </p>
          <p className="event-info">
            Start Time : {this.props.eventInfo.start_time}
          </p>
          <p className="event-info">
            Stop Time : {this.props.eventInfo.stop_time}
          </p>
        </div>
        {/* )} */}
      </div>
    );
  }
}
