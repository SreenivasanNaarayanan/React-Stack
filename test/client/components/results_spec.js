import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from "../../../client/components/results"
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = ReactTestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {

    const pair = List.of('Batman Begins', 'The Dark Knight');

    const tally = Map({
      'Batman Begins': 3,
      'The Dark Knight': 5
    });

    const component = renderIntoDocument(
      <Results pair={pair} tally={tally}/>
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');

    const firstEntry = entries[0].textContent;

    expect(entries.length).to.equal(2);
    expect(firstEntry).to.contain('Batman Begins');
    expect(firstEntry).to.contain('3');

  });

  it('invokes the callback function when next button is clicked', () => {

    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Batman Begins', 'The Dark Knight');

    const component = renderIntoDocument(
      <Results pair={pair}
        tally={Map()}
        next={next}/>
    );

    expect(nextInvoked).to.equal(false);

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);

  });

  it('renders the winner when there is one', () => {

    const pair = List.of('Batman Begins', 'The Dark Knight');

    const component = renderIntoDocument(
      <Results pair={pair}
        tally={Map()}
        winner="The Dark Knight"/>
    );

    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner.textContent).to.contain('The Dark Knight');

  });

});