import React, { Component, useEffect } from 'react';
import Game from './game/container';
import { GameLoading } from './game/components/loading';
import { GameError } from './game/components/error';
import { connect, useState, useSelector, useDispatch } from 'react-redux';
import { types } from "./actions/types";

import './App.css';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.error);

  useEffect(() => {
    dispatch({ type: types.INIT_GAME });
  }, []);
  return (
    <div className="App">
      <h1>Adventure Capitalist</h1>
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
