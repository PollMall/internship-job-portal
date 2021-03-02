// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { mockApolloData } from './queries/MockApolloData';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

Object.defineProperty(window, 'alert', {
  value: jest.fn()
})

function makeMockApolloCalls(props) {
  return props.map((p) => {
    const { query, variables, data} = p;
    console.log(data);
    return {
      request: {
        query,
        variables: variables || {}
      },
      result: {
        data: data || {}
      }
    }
  })
}

const mockApolloCalls = makeMockApolloCalls(mockApolloData);

const AllProviders = ({ children }) => {
  return (
    <MockedProvider mocks={mockApolloCalls} addTypename={false}>
       <MemoryRouter>
         {children}
       </MemoryRouter>
     </MockedProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })


export { customRender as render };