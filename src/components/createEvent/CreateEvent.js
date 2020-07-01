import React, { Component, Fragment, createRef } from "react";
import axios from "axios";
import createRequestBody from "../../utility/CreateReq";

const config = require("../../config.json");

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: {
        name: "",
        description: "",
        status: "",
        startTime: "",
        stopTime: "",
      },
    };
    this.baseState = this.state;
  }

  handleCreateEvent = async (event) => {
    event.preventDefault();
    try {
      const newEvent = createRequestBody(
        this.state.formInput,
        this.props.auth.username
      );
      await axios.post(`${config.api.invokeUrl}/events/`, newEvent);
      alert(`Created Successfully! Event ID: ${newEvent.eventId}`);
      this.setState(this.baseState);
    } catch (err) {
      alert("New Event Creation Unsuccessful! Please Try Again");
      console.error(err);
    }
  };

  onFornInputChange = (event) => {
    const changedInput = { ...this.state.formInput };
    changedInput[event.target.id] = event.target.value;
    this.setState({
      formInput: changedInput,
    });
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Create Event</h1>
          <p className="subtitle is-5">
            Fill in the details to create new event
          </p>
          <br />
          <div className="columns">
            <div className="column is-one-third">
              <form onSubmit={(event) => this.handleCreateEvent(event)}>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    id="name"
                    placeholder="Enter Event Name"
                    value={this.state.formInput.name}
                    onChange={this.onFornInputChange}
                    required
                  />
                </div>
                <br />
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    id="description"
                    placeholder="Enter Event Description"
                    value={this.state.formInput.description}
                    onChange={this.onFornInputChange}
                  />
                </div>
                <br />
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    id="status"
                    placeholder="Enter Event Status"
                    value={this.state.formInput.status}
                    onChange={this.onFornInputChange}
                    required
                  />
                </div>
                <br />
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    id="startTime"
                    placeholder="Enter Event Start Time"
                    value={this.state.formInput.startTime}
                    onChange={this.onFornInputChange}
                  />
                </div>
                <br />
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    id="stopTime"
                    placeholder="Enter Event Stop Time"
                    value={this.state.formInput.stopTime}
                    onChange={this.onFornInputChange}
                  />
                </div>
                <br />
                <button type="submit" className="button is-primary is-medium">
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
