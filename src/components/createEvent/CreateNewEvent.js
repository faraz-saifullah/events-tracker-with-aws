import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import createRequestBody from "../../utility/CreateReq";

const config = require("../../config.json");

export default class CreateNewEvent extends Component {
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
      <center>
        <form onSubmit={(event) => this.handleCreateEvent(event)}>
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="name">Event Name</InputLabel>
            <Input
              value={this.state.formInput.name}
              onChange={this.onFornInputChange}
              id="name"
              aria-describedby="name-helper-text"
              required
            />
            <FormHelperText id="name-helper-text">
              Name of your event.
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              value={this.state.formInput.description}
              onChange={this.onFornInputChange}
              id="description"
              aria-describedby="description-helper-text"
            />
            <FormHelperText id="description-helper-text">
              Description of the event.
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Input
              value={this.state.formInput.status}
              onChange={this.onFornInputChange}
              id="status"
              aria-describedby="status-helper-text"
              required
            />
            <FormHelperText id="status-helper-text1">
              Status of your event.
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="startTime">Start Time</InputLabel>
            <Input
              value={this.state.formInput.startTime}
              onChange={this.onFornInputChange}
              id="startTime"
              aria-describedby="startTime-helper-text"
              required
            />
            <FormHelperText id="startTime-helper-text">
              Start Time of your event.
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="stopTime">Stop Time</InputLabel>
            <Input
              value={this.state.formInput.stopTime}
              onChange={this.onFornInputChange}
              id="stopTime"
              aria-describedby="stopTime-helper-text"
              required
            />
            <FormHelperText id="stopTime-helper-text">
              Stop Time of your event.
            </FormHelperText>
          </FormControl>
          <br />
          <button type="submit" className="button is-primary is-medium">
            Create Event
          </button>
        </form>
      </center>
    );
  }
}
