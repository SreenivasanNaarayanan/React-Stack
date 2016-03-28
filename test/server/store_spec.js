import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../../server/store';

describe('Store', () => {

  it('is a redux store configured with the correct reducer', () => {

    const store = makeStore();

    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Batman Begins', 'The Dark Knight']
    });

    expect(store.getState()).to.equal(fromJS({
      entries: ['Batman Begins', 'The Dark Knight']
    }));

  });

});