import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";

class Rom extends Component {

    onRowClicked(event){
        this.setState(event.data);
    }

    componentDidMount() {
        fetch('http://localhost:8080/list')
            .then(res => res.json())
            .then((data) => {
                console.log('data ' + JSON.stringify(data));
                this.setState({ rowData: data })
            })
            .catch(console.log)
    }

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Name", field: "name", sortable: true, filter: true
            }, {
                headerName: "Rom Name", field: "romName", sortable: true, filter: true
            }]
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div
                    className="ag-theme-dark"
                    style={{
                        height: '400px',
                        width: '800px'
                    }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        onRowClicked={this.props.onChosen}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

export default Rom;