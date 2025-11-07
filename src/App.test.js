import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bug tracker title', () => {
  render(<App />);
  const titleElement = screen.getByText(/bug tracker/i);
  expect(titleElement).toBeInTheDocument();
});
