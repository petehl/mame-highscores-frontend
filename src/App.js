import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:8080/greeting')
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
        headerName: "Game", field: "game", sortable: true, filter: true
      }, {
        headerName: "Player", field: "player", sortable: true, filter: true
      }, {
        headerName: "Score", field: "score", sortable: true, filter: true
      }]
    }
  }

  render() {
    return (
        <div
            className="ag-theme-alpine"
            style={{
              height: '250px',
              width: '600px' }}
        >
          <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}>
          </AgGridReact>
        </div>
    );
  }
}

export default App;