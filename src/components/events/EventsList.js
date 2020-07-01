import React, { Component, Fragment } from "react";
import axios from "axios";
import Event from "./Event";

const config = require("../../config.json");

export default class EventsList extends Component {
  state = {
    newproduct: null,
    events: [],
  };

  fetchevents = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/events?username=${this.props.auth.username}`);
      const events = res.data;
      console.log(events);
      this.setState({ events });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  componentDidMount = async () => {
    setImmediate(() => {
      this.fetchevents();
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
                    {this.state.events && this.state.events.length > 0 ? (
                      this.state.events.map((event) => (
                        <Event
                          productInfo={event}
                          key={event.eventId}
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
