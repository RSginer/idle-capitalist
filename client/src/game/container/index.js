import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from "../../config";
import { Cash } from '../components/cash';
import { Business } from '../components/business';

import "./index.css";

export class Game extends Component {


  render() {
    return (
      <div>
        <Cash amount={this.props.cashAmount} />
        <div className="game-businesses-container">
          <div className="game-businesses-list">
            {Object.keys(config.businesses).map((businessKey) => <Business
               key={businessKey} 
               title={config.businesses[businessKey].title} 
               type={businessKey} 
               managersBasePrice={config.businesses[businessKey].managersBasePrice}
               price={config.businesses[businessKey].price}
               />)}
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.player.userId,
    cashAmount: state.player.cashAmount
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Game);

