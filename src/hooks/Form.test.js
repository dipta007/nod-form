import 'mutationobserver-shim';
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Form from './Form'
import { render, screen, fireEvent, waitForDomChange } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});


const inputValue = async (component, value) => {
  await fireEvent.input(component, {
    target: {
      value,
    }
  })
}

const selectValue = async (component, value) => {
  await fireEvent.change(component, {
    target: {
      value,
    }
  })
}


describe('app', () => {
  it('should show all tooltip', () => {
    render(<Form />)
    expect(screen.queryByTitle('The customers primary contact email address')).toBeTruthy()
    expect(screen.queryByTitle('The customers current residential address')).toBeTruthy()
    expect(screen.queryByTitle('Select all of the areas that you are providing a recommendation for')).toBeTruthy()
    
  })

  it('should show all the alerts', async () => {
    render(<Form />)
    fireEvent.submit(screen.getByText('Submit'));
    expect(await screen.findAllByText(/is Required/i)).toHaveLength(7);

    inputValue(screen.getByLabelText('Email'), 'aaaa')
    expect(await screen.findAllByText(/Invalid email/i)).toHaveLength(1);
  })

  it('should show progress with fix number', async () => {
    const { container } = render(<Form />)

    expect(screen.getByText(/Progress/i).textContent).toContain('0%')

    await inputValue(screen.getByLabelText('First Name'), 'First Name')
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('13%')

    await inputValue(screen.getByLabelText('Last Name'), 'Last Name')
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('25%')

    await inputValue(container.querySelector("#\\33"), '2020-01-01')
    fireEvent.submit(screen.getByText('Submit'));
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('38%')

    await inputValue(screen.getByLabelText('Email'), 't@t.com')
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('50%')

    await inputValue(screen.getByLabelText('Address'), 'Test Address')
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('63%')

    await inputValue(container.querySelector("#\\36"), '+8801701861473')
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('75%')

    fireEvent.mouseDown(container.querySelector("#\\37"))
    await waitForDomChange()
    fireEvent.click(screen.getAllByRole('option')[0])
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('88%')

    fireEvent.mouseDown(container.querySelector("#\\38"))
    await waitForDomChange()
    fireEvent.click(screen.getAllByRole('option')[0])
    fireEvent.click(screen.getAllByRole('option')[2])
    await waitForDomChange()
    expect(screen.getByText(/Progress/i).textContent).toContain('100%')
  })

  it('should properly submit and reset', async () => {
    const { container } = render(<Form />)

    await inputValue(screen.getByLabelText('First Name'), 'First Name')

    await inputValue(screen.getByLabelText('Last Name'), 'Last Name')

    await inputValue(container.querySelector("#\\33"), '2020-01-01')
    fireEvent.submit(screen.getByText('Submit'));
    await waitForDomChange()

    await inputValue(screen.getByLabelText('Email'), 't@t.com')

    await inputValue(screen.getByLabelText('Address'), 'Test Address')

    await inputValue(container.querySelector("#\\36"), '+8801701861473')

    fireEvent.mouseDown(container.querySelector("#\\37"))
    await waitForDomChange()
    fireEvent.click(screen.getAllByRole('option')[0])

    fireEvent.mouseDown(container.querySelector("#\\38"))
    await waitForDomChange()
    fireEvent.click(screen.getAllByRole('option')[0])
    fireEvent.click(screen.getAllByRole('option')[2])
    await waitForDomChange()

    const submit = container.querySelector('#submit')
    act(() => {
      submit.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    await waitForDomChange()

    expect(screen.getByText(/Progress/i).textContent).toContain('0%')
  })
})