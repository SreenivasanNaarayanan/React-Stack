import {Map,fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../server/reducer';

describe('reducer', () => {

  it('should handle undefined state', () => {

    const action = {
      type: 'SET_ENTRIES',
      entries: ['Batman Begins']
    };
    const nextState = reducer(undefined, action);
    const expectedNextState = fromJS({entries: ['Batman Begins']});

    expect(nextState).to.equal(expectedNextState);


  });

  it('should set entries', () => {

    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Batman Begins']
    };
    const nextState = reducer(initialState, action);
    const expectedNextState = fromJS({entries: ['Batman Begins']});

    expect(nextState).to.equal(expectedNextState);

  });

  it('should handle the next pair', () => {

    const initialState = fromJS({

      entries: ['Batman Begins', 'The Dark Knight', 'The Dark Knight Returns']

    });

    const action = {type: 'NEXT'};

    const nextState = reducer(initialState, action);

    const expectedNextState = fromJS({
      votes: {
        pair: ['Batman Begins', 'The Dark Knight']
      },
      entries: ['The Dark Knight Returns']
    });

    expect(nextState).to.equal(expectedNextState);

  });

  it('should handle the voting action', () => {

    const initialState = fromJS({
      votes: {
        pair: ['Batman Begins', 'The Dark Knight']
      },
      entries: ['The Dark Knight Returns']
    });

    const action = {
      type: 'VOTE',
      entry: 'The Dark Knight'
    };

    const nextState = reducer(initialState, action);

    const expectedNextState = fromJS({
      votes: {
        pair: ['Batman Begins', 'The Dark Knight'],
        tally: {
          'The Dark Knight': 1
        }
      },
      entries: ['The Dark Knight Returns']
    });

    expect(nextState).to.equal(expectedNextState);

  });

  it('should be able to reduce the actions to the final state', () => {

    const actions = [
      {
        type: 'SET_ENTRIES',
        entries: ['Batman Begins', 'The Dark Knight']
      },
      {
        type: 'NEXT'
      },
      {
        type: 'VOTE',
        entry: 'The Dark Knight'
      },
      {
        type: 'VOTE',
        entry: 'Batman Begins'
      },
      {
        type: 'VOTE',
        entry: 'The Dark Knight'
      },
      {
        type: 'NEXT'
      }
    ];
    const finalState = actions.reduce(reducer, Map());

    const expectedFinalState = fromJS({
      winner: 'The Dark Knight'
    });

    expect(finalState).to.equal(expectedFinalState);

  });

});