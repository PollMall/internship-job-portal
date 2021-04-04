import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobDetails from './JobDetails';
import { render } from '../setupTests';
import { jobDetails } from '../res/mockData';
import { UserContext } from '../UserProvider';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: (query) => ({
    data: {
      userJobApplications: [
        {
          id: 1,
          job: {
            id: 1,
            name: 'Senior Frontend Engineer (ReactJS)',
            description: "We're hiring! Start your career as a UI developer",
          },
          user: {
            id: 1,
            username: 'User',
            firstName: 'Simple user',
            lastName: 'Searching for a job',
          },
          isAccepted: false,
          updatedAt: 1614432204,
        },
      ],
    },
    loading: false,
    error: undefined,
    query,
  }),
  useMutation: (query) => (
    [
      ({ variables }) => {
        if (variables.userId && variables.jobId) {
          return {
            variables,
          };
        }
        throw new Error('error');
      },
      {
        loading: false,
        error: undefined,
        query,
      },
    ]
  ),
}));

describe('JobDetails tests', () => {
  it('should have apply button disabled', async () => {
    render(
      <UserContext.Provider value={{ state: { user: { id: 1 } } }}>
        <JobDetails job={jobDetails} />
      </UserContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('disabled');
    });
  });

  it('should apply to job', async () => {
    render(
      <UserContext.Provider value={{ state: { user: { id: 2 } } }}>
        <JobDetails job={jobDetails} />
      </UserContext.Provider>,
    );
    const applyButton = screen.getByRole('button');

    expect(applyButton).not.toHaveAttribute('disabled');
    userEvent.click(applyButton);
    await waitFor(() => {
      expect(applyButton).toHaveAttribute('disabled');
    });
  });

  it('should throw error', async () => {
    render(
      <UserContext.Provider value={{ state: { user: { } } }}>
        <JobDetails job={jobDetails} />
      </UserContext.Provider>,
    );
    const applyButton = screen.getByRole('button');

    expect(applyButton).not.toHaveAttribute('disabled');
    userEvent.click(applyButton);
    await waitFor(() => {
      expect(applyButton).not.toHaveAttribute('disabled');
    });
  });
});
