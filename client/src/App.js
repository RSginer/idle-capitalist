import React, { Component } from 'react';
import Game from './game/container';
import { initGame } from './actions';
import { GameLoading } from './game/components/loading';
import { GameError } from './game/components/error';
import { connect } from 'react-redux';

import './App.css';

export class App extends Component {

  componentWillMount() {
    this.props.initGame();
  }

  render() {
    return (
      <div className="App">
        <main>
          {
            !this.props.loading && !this.props.error && <Game />
          }
          {this.props.loading && <GameLoading />}
          {!this.props.loading && this.props.error && <GameError message={JSON.stringify(this.props.error)} />}
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ui.loading,
    error: state.ui.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initGame: initGame(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
