import React, { Component } from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import Rom from './Rom';
import Score from './Score';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showIt: false
        }
    }

    onClick(event) {
        console.log(event.data)
        this.setState({
            showIt: true,
            details: event.data
        })
    }

    render() {
        return (
            <div>
                {!this.state.showIt &&
                    <Rom onChosen={this.onClick.bind(this)}/>
                }
                {this.state.showIt &&
                    <Score details={this.state.details}/>
                }
            </div>
        );
    }

}

export default App;