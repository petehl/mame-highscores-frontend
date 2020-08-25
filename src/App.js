import React, { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from 'react-moment';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {

    componentDidMount() {
        this.updateFromApi()
        this.interval = setInterval(() => {
          this.updateFromApi();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateFromApi() {
        fetch('http://192.168.25.104:8080/list')
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
                  <th>Last time played</th>
                  <th>Top players</th>
                </tr>
              </thead>
              <tbody>
                {this.state && this.state.data && this.state.data.map((game, index) => (
                    <tr key={index}>
                      <td>{game.name}</td>
                      <td>
                        <Moment fromNow="true">{game.lastModifiedTime}</Moment>
                        <p><Moment format="DD/MM-YYYY HH:mm:ss">{game.lastModifiedTime}</Moment></p>
                      </td>
                      <td>
                          <ListGroup>
                            {game.highscores.map((highscore, index) => (
                                <ListGroup.Item key={index}>{index+1}. {highscore.name} ({highscore.score})</ListGroup.Item>
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