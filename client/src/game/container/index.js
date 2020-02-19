import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Cash } from '../components/cash';

import "./index.css";

export class Game extends Component {

  render() {
    return (
    <div>
      <div className="userId">USER_ID: {this.props.userId}</div>
      <Cash amount={1000000} />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.player.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Game);

