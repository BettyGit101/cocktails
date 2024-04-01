import React from 'react';
import { render, screen } from '@testing-library/react';
import AddNewCocktail from './AddNewCocktail';

test('renders AddNewCocktail - inputs should be initially empty', () => {
  render(<AddNewCocktail />);
  const cocktailNameInput = screen.getByLabelText("Cocktail name");
  const IngredientsInput = screen.getByLabelText("Ingredients");
  const InstructionsInput = screen.getByLabelText("Instructions");

  expect(cocktailNameInput.textContent).toBe("");
  expect(IngredientsInput.textContent).toBe("");
  expect(InstructionsInput.textContent).toBe("");
});