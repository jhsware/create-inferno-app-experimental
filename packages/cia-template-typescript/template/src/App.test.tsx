import { render } from 'inferno';
import App from './App';

let container = document.createElement('div');

test('renders learn inferno link', () => {
  render(<App />, container);
  // const linkElement = screen.getByText(/learn inferno/i);
  expect(
    container.getElementsByClassName('App-link').length
  ).toBe(1);
});
