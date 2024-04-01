import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar - check texts', () => {
  render(<Navbar />);
  const menuHeader = screen.getByRole('heading');
  expect(menuHeader).toBeInTheDocument();
  expect(menuHeader.textContent).toBe('Cocktails');
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Add a new cocktail")).toBeInTheDocument();
});
