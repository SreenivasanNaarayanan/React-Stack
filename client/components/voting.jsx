import React from 'react';
import {connect} from 'react-redux';
import Winner from './winner';
import Vote from './vote';
import * as actionCreators from '../action_creators';

export class Voting extends React.Component {

    render() {
        return (
            <div className="voting">
                {
                    this.props.winner ?
                        <Winner ref="winner" winner={this.props.winner}/> :
                        <Vote {...this.props} />
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        pair: state.getIn(['votes', 'pair']),
        hasVoted: state.get('hasVoted'),
        winner: state.get('winner')
    };
}


export default connect(mapStateToProps, actionCreators)(Voting);