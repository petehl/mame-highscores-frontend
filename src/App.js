import React, { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {

    componentDidMount() {
        fetch('http://localhost:8080/list')
            .then(res => res.json())
            .then((data) => {
                this.setState({ data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <Table bordered>
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Top players</th>
                </tr>
              </thead>
              <tbody>
                {this.state && this.state.data && this.state.data.map(game => (
                    <tr>
                      <td>{game.name}</td>
                      <td>
                          <ListGroup>
                            {game.highscores.map((highscore, index) => (
                                <ListGroup.Item>{index+1}. {highscore.name} ({highscore.score})</ListGroup.Item>
                            ))}
                          </ListGroup>
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>
        );
    }

}

export default App;