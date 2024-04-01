import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer - check text', () => {
  render(<Footer />);
  expect(screen.getByText("Find Your Coctail")).toBeInTheDocument();
});