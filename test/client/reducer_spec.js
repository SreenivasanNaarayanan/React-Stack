import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../../client/reducer';

describe('Reducer', () => {

    it('handles SET_STATE', () => {

        const initialState = Map();

        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Batman Begins', 'The Dark Knight'),
                    tally: Map({'Batman Begins': 2, 'The Dark Knight': 4})
                })
            })
        };

        const nextState = reducer(initialState, action);

        const expectedNextState = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            }
        });

        expect(nextState).to.equal(expectedNextState);


    });

    it('handles SET_STATE with plain JS payload', () => {

        const initialState = Map();

        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Batman Begins', 'The Dark Knight'],
                    tally: {'Batman Begins': 2, 'The Dark Knight': 4}
                }
            }
        };

        const nextState = reducer(initialState, action);

        const expectedNextState = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            }
        });

        expect(nextState).to.equal(expectedNextState);


    });

    it('handles SET_STATE without initial state', () => {

        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Batman Begins', 'The Dark Knight'],
                    tally: {'Batman Begins': 2, 'The Dark Knight': 4}
                }
            }
        };

        const nextState = reducer(undefined, action);

        const expectedNextState = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            }
        });

        expect(nextState).to.equal(expectedNextState);


    });

    it('handles VOTE by setting hasVoted', () => {

        const state = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            }
        });

        const action = {type: 'VOTE', entry: 'The Dark Knight'};
        const nextState = reducer(state, action);

        const expectedNextState = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            },
            hasVoted: 'The Dark Knight'
        });

        expect(nextState).to.equal(expectedNextState);

    });

    it('does not set hasVoted for VOTE on invalid entry', () => {

        const state = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            }
        });

        const action = {type: 'VOTE', entry: 'The Dark Knight Rises'};
        const nextState = reducer(state, action);

        const expectedNextState = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            }
        });

        expect(nextState).to.equal(expectedNextState);

    });

    it('removes hasVoted on SET_STATE if pair changes', () => {

        const initialState = fromJS({
            vote: {
                pair: ['Batman Begins', 'The Dark Knight'],
                tally: {'Batman Begins': 2, 'The Dark Knight': 4}
            },
            hasVoted: 'The Dark Knight'
        });

        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Inception', 'The Dark Knight Rises']
                }
            }
        };

        const nextState = reducer(initialState, action);

        const expectedNextState = fromJS({
            vote: {
                pair: ['Inception', 'The Dark Knight Rises']
            }
        });

        expect(nextState).to.equal(expectedNextState);

    });


});