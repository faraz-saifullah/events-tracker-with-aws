import React, { memo } from "react";
import MaterialTable from "material-table";
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import SortArrow from '@material-ui/icons/Sort';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import config from "../../config.json";

export default class VocabTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    delFromList = (oldData) => {
        let newData = this.state.events;
        console.log(newData);
        newData.splice(oldData.tableData.id, 1);
        this.setState({
            events: newData
        })
    }

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
        const columns = [
            { title: "Name", field: "name" },
            { title: "Status", field: "status" },
            { title: "Description", field: "description" },
            {
                title: "Start Time",
                field: "startTime"
            },
            {
                title: "End Time",
                field: "endTime"
            }
        ];
        const tableRows = [];
        if (this.state.events.length !== 0) {
            for (let i = 0; i < this.state.events.length; i++) {
                const object = {
                    name: this.state.events[i].name,
                    status: this.state.events[i].status,
                    description: this.state.events[i].description,
                    startTime: this.state.events[i].start_time,
                    endTime: this.state.events[i].stop_time
                };
                tableRows.push(object);
            }
        }
        return (
            <MaterialTable
                title="Events List"
                columns={columns}
                icons={{
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
                    Edit: () => <EditIcon />
                }}
                options={{
                    pageSize: 11,
                    pageSizeOptions: [],
                    toolbar: true,
                    paging: true
                }}
                data={tableRows}
                editable={{
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                this.delFromList(oldData);
                            }, 600);
                        }),
                    onRowUpdate: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                this.delFromList(oldData);
                            }, 600);
                        }),
                }}
            />
        );
    }
}
