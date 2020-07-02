import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {
  getIcons,
  getColumnConfig,
  getRowsList,
  getTableOptions,
} from "./tableConfig";
import config from "../../config.json";

export default class VocabTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  deleteEvent = (oldData) => {
    const newData = this.state.events;
    newData.splice(oldData.tableData.id, 1);
    this.setState({
      events: newData,
    });
  };

  updateEvent = async (newData) => {
    const rowIndex = newData.serial - 1;
    const { eventId, username } = this.state.events[rowIndex];
    const updateData = {
      ...newData,
      eventId,
      username,
    };
    const newState = this.state.events;
    newState[rowIndex] = updateData;
    try {
      this.setState({
        events: newState,
      });
      await axios.put(`${config.api.invokeUrl}/events/`, updateData);
    } catch (err) {
      console.error(err);
    }
  };

  fetchevents = async () => {
    try {
      const res = await axios.get(
        `${config.api.invokeUrl}/events?username=${this.props.auth.username}`
      );
      const events = res.data;
      this.setState({ events });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount = async () => {
    setImmediate(() => {
      this.fetchevents();
    });
  };

  render() {
    return (
      <MaterialTable
        title="Events List"
        columns={getColumnConfig()}
        icons={getIcons()}
        options={getTableOptions()}
        data={getRowsList(this.state.events)}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.deleteEvent(oldData);
              }, 600);
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.updateEvent(newData);
              }, 600);
            }),
        }}
      />
    );
  }
}
