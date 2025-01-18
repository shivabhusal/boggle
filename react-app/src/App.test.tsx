import { render, screen, fireEvent } from '@testing-library/react'
import App from './App';
import {test, expect} from '@jest/globals'

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Start New Game/i);
  fireEvent.click(linkElement);
  expect(linkElement).toBeInstanceOf(HTMLButtonElement);
});
