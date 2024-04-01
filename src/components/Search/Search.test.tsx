import React from 'react';
import Search from './Search';
import { render, screen } from '@testing-library/react';


const setApiSearchedData = () => {}

describe("Search Component", () => {
  beforeEach(() => {
    render(<Search setApiSearchedData={setApiSearchedData}/>);
  })

  test("input should be initially empty", () => {
    const searchInput = screen.getByLabelText("Please enter cocktail name");
    expect(searchInput.textContent).toBe("");
  })
})

