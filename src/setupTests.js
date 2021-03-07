// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import UserProvider from './UserProvider';

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

const AllProviders = ({ mocks, initialValue, children }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider initialValue={initialValue}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </UserProvider>
     </MockedProvider>
  )
}

const customRender = (ui, mocks, initialValue) => {
  return render(
    <AllProviders mocks={mocks || []} initialValue={initialValue}>
      {ui}
    </AllProviders>
  )
}

export { customRender as render };
