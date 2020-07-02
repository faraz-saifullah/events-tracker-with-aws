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
      columnConfig: getColumnConfig(),
    };
  }

  deleteEvent = (oldData) => {
    const newData = this.state.events;
    newData.splice(oldData.tableData.id, 1);
    this.setState({
      events: newData,
    });
  };

  updateEvent = (oldData) => {
    console.log(oldData);
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
        columns={this.state.columnConfig}
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
          onRowUpdate: (oldData) => {
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.updateEvent(oldData);
              }, 600);
            });
          },
        }}
      />
    );
  }
}
