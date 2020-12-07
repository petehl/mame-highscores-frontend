import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Particles from 'react-particles-js';

import { default as snow } from './snow.json';
import './Scoreboard.scss';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';

async function fetchData() {
  try {
    const res = await fetch("http://mufkarkade.local:8080/list");
    return await res.json();
  } catch (error) {
    console.error(error.message)
  }
}

function Scoreboard() {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const isChristmas = new Date().getMonth() === 11;

  useEffect(() => {
    fetchData().then(setData);
    const interval = setInterval(() => {
      fetchData().then(setData);
    }, 5000)
    return () => {
      clearTimeout(interval);
    }
  }, []);


  return (
    <>
      {isChristmas && (
        <>
          <Particles
            className="position-absolute w-100 h-100"
            width="100%"
            height="100%"
            params={snow}
          />
          <div className="lightrope">
            <ul>
              {
                [...Array(70)].map((_, index) => (
                  <li key={index}/>
                ))
              }
            </ul>
          </div>
        </>
      )}
      <Table borderless>
        <thead>
        <tr>
          <th>Game</th>
          <th>Last time played</th>
          <th>Top players</th>
        </tr>
        </thead>
        <tbody>
        {data && data.map((game, index) => (
          <tr key={index}>
            <td>{t(game.name)}</td>
            <td>
              <Moment fromNow="true">{game.lastModifiedTime}</Moment>
              <p><Moment format="DD/MM-YYYY HH:mm:ss">{game.lastModifiedTime}</Moment></p>
            </td>
            <td>
              <ListGroup>
                {game.highscores.map((highscore, index) => (
                  <ListGroup.Item key={index}>{index + 1}. {highscore.alias} ({highscore.score})</ListGroup.Item>
                ))}
              </ListGroup>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <div className="pi"><a href="./admin">𝜋</a></div>
    </>
  );
}

export default Scoreboard