import React from 'react'
import { cleanup, render } from '@testing-library/react'
import TextInput from './TextInput'

afterEach(cleanup)

test('renders TextInput with proper label', () => {
  const screen = render(<TextInput label='TEST label' />)

  expect(screen.queryByText(/TEST label/i)).toBeTruthy()
  expect(screen.queryByText(/Not TEST/i)).not.toBeTruthy()
})


test('renders TextInput with proper error message', () => {
  const error = { message: 'Error' }
  const screen = render(<TextInput label='TEST label' error={error}  />)

  expect(screen.queryByText(/Error/i)).toBeTruthy()
  expect(screen.queryByText(/Not Error/i)).not.toBeTruthy()
})


test('renders TextInput with proper tooltip', () => {
  const screen = render(<TextInput tooltip="Test Tooltip"  />)

  expect(screen.queryByTitle(/Test Tooltip/i)).toBeTruthy()
  expect(screen.queryByTitle(/Not Test Tooltip/i)).not.toBeTruthy()
})
