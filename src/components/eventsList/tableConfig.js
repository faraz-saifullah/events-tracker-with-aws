import React from "react";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import SortArrow from "@material-ui/icons/Sort";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

export function getIcons() {
  return {
    Check: () => <Check />,
    Delete: () => <DeleteIcon />,
    DetailPanel: () => <ChevronRight />,
    Export: () => <SaveAlt />,
    Filter: () => <FilterList />,
    FirstPage: () => <FirstPage />,
    LastPage: () => <LastPage />,
    NextPage: () => <ChevronRight />,
    PreviousPage: () => <ChevronLeft />,
    Search: () => <Search />,
    SortArrow: () => <SortArrow />,
    ThirdStateCheck: () => <Remove />,
    ViewColumn: () => <ViewColumn />,
    Clear: () => <ClearIcon />,
    Edit: () => <EditIcon />,
  };
}

export function getColumnConfig() {
  return [
    {
      title: "Serial",
      field: "serial",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Start Time",
      field: "start_time",
    },
    {
      title: "Stop Time",
      field: "stop_time",
    },
  ];
}

export function getRowsList(events) {
  const tableRows = [];
  if (events.length !== 0) {
    for (let i = 0; i < events.length; i++) {
      const object = {
        serial: i + 1,
        name: events[i].name,
        status: events[i].status,
        description: events[i].description,
        start_time: events[i].start_time,
        stop_time: events[i].stop_time,
      };
      tableRows.push(object);
    }
  }
  return tableRows;
}

export function getTableOptions() {
  return {
    pageSize: 11,
    pageSizeOptions: [],
    toolbar: true,
    paging: true,
  };
}
