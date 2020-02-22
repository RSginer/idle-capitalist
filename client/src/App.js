import React, { useEffect } from 'react';
import Game from './game/container';
import { GameLoading } from './game/components/loading';
import { GameError } from './game/components/error';
import { useSelector, useDispatch } from 'react-redux';
import { initGame } from "./actions";

import './App.css';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.game.loading);
  const error = useSelector((state) => state.game.error);

  useEffect(() => {
    dispatch(initGame());
  }, [dispatch]);
  return (
    <div className="App">
      <h1><a href="https://github.com/RSginer" rel="noopener noreferrer" target="_blank">@RSGiner</a> - Idle Capitalist</h1>
      <div className="container">
        {
          !loading && !error && <Game />
        }
        {loading && <GameLoading />}
        {!loading && error && <GameError message={JSON.stringify(error)} />}
      </div>
    </div>
  )
}


export default App;
