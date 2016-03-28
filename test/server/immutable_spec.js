import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

  describe('a list', () => {

    function addMovie(currentState, movie) {

      return currentState.push(movie);

    }

    it('is immutable', () => {

      let state = List.of('Batman Begins', 'Dark Knight');
      let nextState = addMovie(state, 'Dark Knight Returns');

      let expectedNextState = List.of('Batman Begins', 'Dark Knight', 'Dark Knight Returns');
      let expectedOldState = List.of('Batman Begins', 'Dark Knight');

      expect(nextState).to.equal(expectedNextState);

      expect(state).to.equal(expectedOldState);

    });

  });

  describe('a tree', () => {

    function addMovie(currentState, movie) {

      return currentState.update('movies', movies => movies.push(movie));

    }

    it('is immutable', () => {

      let state = Map({movies: List.of('Batman Begins', 'Dark Knight')});

      let nextState = addMovie(state, 'Dark Knight Returns');

      let expectedNextState = Map({
        movies: List.of('Batman Begins', 'Dark Knight', 'Dark Knight Returns')
      });

      let expectedOldState = Map({
        movies: List.of('Batman Begins', 'Dark Knight')
      });

      expect(nextState).to.equal(expectedNextState);

      expect(state).to.equal(expectedOldState);

    });

  });

});