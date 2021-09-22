import Inferno from 'inferno';
import { render, screen } from '@testing-library/inferno';
import App from './App';

test('renders learn inferno link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn inferno/i);
  expect(linkElement).toBeInTheDocument();
});
