import React from 'react';
import {connect} from 'react-redux';
import Winner from './winner';

import * as actionCreators from '../action_creators';

export class Results extends React.Component {

    getVotes(entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }
        return 0;
    }

    render() {
        return this.props.winner ? <Winner ref="winner" winner={this.props.winner}/> :
            <div className="results">
                <div className="tally">
                    {this.props.pair.map(entry =>
                        <div key={entry} className="entry">
                            <h1>{entry}</h1>
                            <div className="voteCount">
                                {this.getVotes(entry)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="management">
                    <button ref="next"
                            className="next"
                            onClick={this.props.next}>
                        Next
                    </button>
                </div>
            </div>;
    }

}

function mapStateToProps(state) {
    return {
        pair: state.getIn(['votes', 'pair']),
        tally: state.getIn(['votes', 'tally']),
        winner: state.get('winner')
    }
}

export default connect(mapStateToProps, actionCreators)(Results);