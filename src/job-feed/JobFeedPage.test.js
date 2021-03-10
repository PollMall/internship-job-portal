import React from 'react';
import {
  screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { render } from '../setupTests';
import JobFeedPage from './JobFeedPage';
import { makeMock, mockResponseType } from '../queries/MockApollo';
import { GET_JOBS } from '../queries/JobQueries';

describe('JobFeedPage tests', () => {
  it('should render jobs', async () => {
    const mockData = {
      query: GET_JOBS,
      variables: {},
      response: {
        jobs: [
          {
            id: 1,
            name: 'name',
            description: 'description',
            isAvailable: true,
            company: {
              name: 'company',
            },
            updatedAt: 1614432203,
          },
          {
            id: 2,
            name: 'name',
            description: 'description',
            isAvailable: false,
            company: {
              name: 'company',
            },
            updatedAt: 1614432203,
          },
        ],
      },
    };

    render(<JobFeedPage />, [makeMock(mockData, mockResponseType.SUCCESS)], { user: { id: 1, username: 'user', password: 'user' } });
    expect(await screen.findByTestId('job-feed-data')).toBeInTheDocument();
  });

  it('should render error alert', async () => {
    const mockData = {
      query: GET_JOBS,
      variables: {},
      response: {
        jobs: [
          {
            id: 1,
            name: 'name',
            desciption: 'desciption',
            isAvailable: true,
            company: {
              name: 'company',
            },
            updatedAt: 1614432203,
          },
        ],
      },
    };

    render(<JobFeedPage errorAutoHide={10} />, [makeMock(mockData, mockResponseType.ERROR)], { user: { id: 1, username: 'user', password: 'user' } });
    expect(await screen.findByTestId('job-feed-error')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('job-feed-error'));
  });
});
