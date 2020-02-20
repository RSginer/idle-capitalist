import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Cash } from '../components/cash';

import "./index.css";
import { Business } from '../components/business';

export class Game extends Component {

  render() {
    return (
    <div>
      <div className="userId">USER_ID: {this.props.userId}</div>
      <Cash amount={1000000} />
      <h2 className="businesses-label">Businesses</h2>
      <Business />
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

