import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const testShow = {
    name: 'Breaking Bad',
    summary: 'Good Show',
    seasons: [
        {id:0, name: "Season 1", episodes: []}, 
        {id:1, name: "Season 2", episodes: []}, 
        {id:2, name: "Season 3", episodes: []}, 
        {id:3, name: "Season 4", episodes: []}
      ],
}

test('renders Display component without props', () => {
    render(<Display/>);
})

test('Fetch button press loads show component', async () => {
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);
    const btn = screen.getByRole("button");
    userEvent.click(btn);
    const showComp = await screen.findByTestId("show-container");
    expect(showComp).toBeInTheDocument();
})

test('Number 5', async () => {
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);
    const btn = screen.getByRole("button");
    userEvent.click(btn);
    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons.length).toBe(4);
})

test('Number 6', async ()=> {
    const fakeFunc = jest.fn();

    render(<Display displayFunc={fakeFunc}/>);

    fetchShow.mockResolvedValueOnce(testShow);
    const btn = screen.getByRole("button");
    userEvent.click(btn);

    expect(fakeFunc).toBeCalledTimes(1);
})





///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.