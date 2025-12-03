import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure jest-dom matchers are available
import App from './App';

test('renders App without crashing', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toBeInTheDocument(); // Assert a real DOM node exists
});
