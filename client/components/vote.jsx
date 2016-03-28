import React from 'react';

export default class extends React.Component {

  static get displayName() {
    return 'Vote';
  }

  static get defaultProps() {
    return {
      hasVoted: false,
      pair: [],
      vote: () => {}
    };
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  render() {
    return (
      <div className="voting">
        {
          this.props.pair.map(entry =>
            <button key={entry}
              disabled={this.isDisabled()}
              onClick={() => this.props.vote(entry)}>
              <h1>{entry}</h1>
              {this.hasVotedFor(entry) ? <div className="label">Voted</div> : null}
            </button>
          )
        }
      </div>
    );
  }

}
