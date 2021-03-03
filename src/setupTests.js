// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

Object.defineProperties(window, {
  matchMedia: {
    value: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }),
  },
  alert: {
    value: jest.fn()
  }
});

const AllProviders = ({ mocks, children }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
       <MemoryRouter>
         {children}
       </MemoryRouter>
     </MockedProvider>
  )
}

const customRender = (ui, mocks) => {
  return render(
    <AllProviders mocks={mocks || []}>
      {ui}
    </AllProviders>
  )
}

export { customRender as render };
