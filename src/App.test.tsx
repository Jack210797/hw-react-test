import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import App from './App'

test('renders Vite + React heading', () => {
  render(<App />)
  const linkElement = screen.getByText(/Vite \+ React/i)
  expect(linkElement).toBeInTheDocument()
})
test('renders instruction to click logos', () => {
  render(<App />)
  const instructionElement = screen.getByText(/Click on the Vite and React logos to learn more/i)
  expect(instructionElement).toBeInTheDocument()
})
