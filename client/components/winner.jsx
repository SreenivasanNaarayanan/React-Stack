import React from 'react';

export default class extends React.Component {

  static get displayName() {
    return 'Winner';
  }

  static get defaultProps() {
    return {
      winner: null
    };
  }

  render() {
    return (
      <div className="winner">
       Winner is {this.props.winner}!
      </div>
    );
  }

}
