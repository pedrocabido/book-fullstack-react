import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Switch.css';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

class Switch extends React.Component {
  state = {
    payMethod: BTC,
  };

  select = (selection) => {
    return (evt) => {
      this.setState({ payMethod: selection });
    }
  }

  render() {
    return (
      <div className='switch'>
        <Choice 
          onClick={this.select(CREDITCARD)}
          active={this.state.payMethod === CREDITCARD}
          label="Pay with Creditcard"
        />
        <Choice 
          onClick={this.select(BTC)}
          active={this.state.payMethod === BTC}
          label="Pay with Bitcoin"
        />
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}

module.exports = Switch;

const Choice = function(props) {
  const cssClasses = [];

  if (props.active) {
    cssClasses.push(styles.active);
  }

  return (
    <div 
      className='choice' 
      onClick={props.onClick}
      className={cssClasses}
    >
      {props.label}
    </div>
  )
}