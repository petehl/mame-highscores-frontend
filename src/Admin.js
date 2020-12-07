import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import './Admin.css';

const URL = 'http://mufkarkade.local:8080/admin';

export default function Admin() {
  const [data, setData] = useState();
  const history = useHistory();
  const { register, handleSubmit, control, reset } = useForm();
  const { fields: players, append: appendPlayer, remove: removePlayer } = useFieldArray({
    control,
    name: "players"
  });

  useEffect(() => {
    async function updateForm() {
      const data = await fetch(URL)
      let json = await data.json();
      console.log(json);
      setData(json);
      reset(json)
    }
    updateForm();
  }, [reset]);

  const addPlayer = () => appendPlayer({id: null, name: '', tags: ''});
  const deletePlayer = (index) => removePlayer(index);

  const onSubmit = async (data) => {
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    history.push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Save</button>
        <h1>Players</h1>
        <div className="mappings">
          {players.map((player, index) => (
            <div key={index}>
              <input type="hidden" ref={register()} name={`players[${index}].id`} defaultValue={player.id}/>
              <div><input type="text" ref={register()} name={`players[${index}].name`} defaultValue={player.name}/></div>
              <div><input type="text" ref={register()} name={`players[${index}].tags`}
                          defaultValue={player.tags}/></div>
              <button type="button" className="remove" onClick={() => deletePlayer(index)}>-</button>
            </div>
          ))}
          <button type="button" className="add" onClick={addPlayer}>+</button>
        </div>
        <h1>Games</h1>
        <div className="games">
          {!!data && Object.keys(data.games).map((game) => (
            <div key={game}>
              <label>
                <input type="hidden" ref={register()} name={`games.${game}.id`} defaultValue={data.games[game].id}/>
                <input type="checkbox" ref={register} name={`games.${game}.enabled`}
                       defaultChecked={data.games[game].enabled}/>{data.games[game].id}
              </label>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
