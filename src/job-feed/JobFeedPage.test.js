import React from 'react';
import {
  screen, waitForElementToBeRemoved, fireEvent,
} from '@testing-library/react';
import { render } from '../setupTests';
import JobFeedPage from './JobFeedPage';
import { makeMock, mockResponseType } from '../queries/MockApollo';
import { GET_JOBS } from '../queries/JobQueries';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('JobFeedPage tests', () => {
  it('should render jobs', async () => {
    const mockData = {
      query: GET_JOBS,
      variables: {},
      response: {
        jobs: [
          {
            id: 1,
            name: 'name1',
            description: 'description',
            isAvailable: true,
            company: {
              name: 'company',
            },
            updatedAt: 1614432203,
          },
          {
            id: 2,
            name: 'name2',
            description: 'description',
            isAvailable: true,
            company: {
              name: 'company',
            },
            updatedAt: 1614432203,
          },
        ],
      },
    };

    render(
      <JobFeedPage />,
      [makeMock(mockData, mockResponseType.SUCCESS)], { user: { id: 1, username: 'user', password: 'user' } },
    );
    expect(await screen.findByTestId('job-feed-data')).toBeInTheDocument();

    const job = screen.getByText(/name1/i);
    fireEvent.click(job);
    expect(mockHistoryPush).toHaveBeenCalledWith('/jobs/1');
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

    render(
      <JobFeedPage
        errorAutoHide={10}
      />, [makeMock(mockData, mockResponseType.ERROR)], { user: { id: 1, username: 'user', password: 'user' } },
    );
    expect(await screen.findByTestId('job-feed-error')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('job-feed-error'));
  });
});
