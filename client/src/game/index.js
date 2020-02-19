import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initGame } from '../actions';
import { GameStarted } from './container';
import { GameLoading } from './components/loading';
import { GameError } from './components/error';


export class Game extends Component {

  componentWillMount() {
    this.props.initGame();
  }

  render() {
    return (
      <section>
        {
          !this.props.loading && !this.props.error && <GameStarted userId={this.props.userId}/>
        }
        { this.props.loading && <GameLoading/> }
        { !this.props.loading && this.props.error && <GameError message={JSON.stringify(this.props.error)}/>}
      </section>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userId: state.player.userId,
    loading: state.ui.loading,
    error: state.ui.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initGame: initGame(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

