import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {Voting} from '../../../client/components/voting';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = ReactTestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {

    const component = renderIntoDocument(
      <Voting pair={["Batman Begins", "The Dark Knight"]}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Batman Begins');
    expect(buttons[1].textContent).to.equal('The Dark Knight');

  });

  it('invokes callback when a button is clicked', () => {

    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Batman Begins", "The Dark Knight"]}
        vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);

    expect(votedWith).to.equal('The Dark Knight');

  });

  it('disables buttons when user has voted', () => {

    const component = renderIntoDocument(
      <Voting pair={["Batman Begins", "The Dark Knight"]}
        hasVoted="The Dark Knight"/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {

    const component = renderIntoDocument(
      <Voting pair={["Batman Begins", "The Dark Knight"]}
        hasVoted="The Dark Knight"/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[1].textContent).to.contain('Voted');

  });

  it('renders just the winner when there is one', () => {

    const component = renderIntoDocument(
      <Voting winner="The Dark Knight Rises"/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner.textContent).to.contain('The Dark Knight Rises');

  });

});