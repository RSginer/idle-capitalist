import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initGame } from '../actions';

export class Game extends Component {

  componentWillMount() {
    this.props.initGame();
  }

  render() {
    return (
      <section>
        {
          !this.props.loading && !this.props.error && <div>
            <b>USER_ID: {this.props.userId}</b>
        </div>
        }
        { this.props.loading && <div> Loading... </div> }
        { !this.props.loading && this.props.error && <div> {JSON.stringify(this.props.error)} </div> }

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

