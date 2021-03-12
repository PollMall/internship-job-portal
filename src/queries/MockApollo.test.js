import { makeMock } from './MockApollo';

describe('MockApollo testing', () => {
  it.each([
    [
      {
        query: 'query',
        variables: {},
        response: {},
      }, 'type', 'Mock response not supported'],
    [
      {
        query: '',
        variables: {},
        response: { users: [{ id: 1, username: 'user', password: 'user' }] },
      }, 'type', 'Mock response not supported'],
    [
      {
        query: '',
        variables: {},
        response: {},
      }, 'type', 'Mock response not supported'],
  ])('makeMock for data', (data, responseType, errorMessage) => {
    expect(makeMock(data, responseType)).toEqual(Error(errorMessage));
  });
});
