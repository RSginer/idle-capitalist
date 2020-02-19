import React, { Component } from 'react';
import { connect } from 'react-redux';

export class GameStarted extends Component {

  render() {
    return (
      <section>

            <b>USER_ID: {this.props.userId}</b>

      </section>
    )
  }

}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStarted);

