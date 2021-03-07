/* eslint-disable import/prefer-default-export */

export const mockResponseType = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const makeMock = (mockData, type) => {
  const { query, variables, response } = mockData;

  switch (type) {
    case mockResponseType.SUCCESS:
      return {
        request: {
          query,
          variables,
        },
        result: {
          data: response,
        },
      };
    case mockResponseType.ERROR:
      return {
        request: {
          query,
          variables,
        },
        error: response,
      };
    default:
      return new Error('Mock response not supported');
  }
};
