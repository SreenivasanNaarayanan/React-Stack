import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {

      const state = Map();
      const entries = List.of('Batman Begins', 'Dark Knight');

      const nextState = setEntries(state, entries);

      let expectedNextState = Map({
        entries: List.of('Batman Begins', 'Dark Knight')
      });

      expect(nextState).to.equal(expectedNextState);

    });

    it('converts to immutable', () => {

      const state = Map();

      const entries = ['Batman Begins', 'Dark Knight'];

      const nextState = setEntries(state, entries);

      let expectedNextState = Map({
        entries: List.of('Batman Begins', 'Dark Knight')
      });

      expect(nextState).to.equal(expectedNextState);

    });

  });

  describe('next', () => {

    it('next two entries under vote', () => {

      const state = Map({
        entries: List.of('Batman Begins', 'Dark Knight', 'Dark Knight Returns')
      });

      const nextState = next(state);

      let expectedNextState = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight')
        }),
        entries: List.of('Dark Knight Returns')
      });

      expect(nextState).to.equal(expectedNextState);

    });

    it('should add winner of the current vote as the last element in the entries', () => {

      const state = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight'),
          tally: Map({
            'Dark Knight': 3,
            'Batman Begins': 1
          })
        }),
        entries: List.of('Dark Knight Returns')
      });

      const nextState = next(state);

      const expectedNextState = Map({
        votes: Map({
          pair: List.of('Dark Knight Returns', 'Dark Knight')
        }),
        entries: List()
      });

      expect(nextState).to.equal(expectedNextState);

    });

    it('should add both the entries in case of a tie', () => {

      const state = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight'),
          tally: Map({
            'Dark Knight': 1,
            'Batman Begins': 1
          })
        }),
        entries: List.of('Dark Knight Returns')
      });

      const nextState = next(state);

      const expectedNextState = Map({
        votes: Map({
          pair: List.of('Dark Knight Returns', 'Batman Begins')
        }),
        entries: List.of('Dark Knight')
      });

      expect(nextState).to.equal(expectedNextState);

    });

    it('should set winner if there is only on entry left', () => {

      const state = Map({
        votes: Map({
          pair: List.of('Dark Knight Returns', 'Dark Knight'),
          tally: Map({
            'Dark Knight': 3,
            'Dark Knight Returns': 4
          })
        }),
        entries: List()
      });

      const nextState = next(state);

      let expectedNextState = Map({

        winner: 'Dark Knight Returns'

      });

      expect(nextState).to.equal(expectedNextState);

    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {

      const state = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight')
        }),
        entries: List.of('Dark Knight Returns')
      });

      const nextState = vote(state, 'Dark Knight');

      let expectedNextState = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight'),
          tally: Map({
            'Dark Knight': 1
          })
        }),
        entries: List.of('Dark Knight Returns')
      });

      expect(nextState).to.equal(expectedNextState);

    });

    it('should add to the existing tally of the voting entry', () => {

      const state = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight'),
          tally: Map({
            'Dark Knight': 3,
            'Batman Begins': 1
          })
        }),
        entries: List.of('Dark Knight Returns')
      });

      const nextState = vote(state, 'Dark Knight');

      let expectedNextState = Map({
        votes: Map({
          pair: List.of('Batman Begins', 'Dark Knight'),
          tally: Map({
            'Dark Knight': 4,
            'Batman Begins': 1
          })
        }),
        entries: List.of('Dark Knight Returns')
      });

      expect(nextState).to.equal(expectedNextState);

    });

  });

});