import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { render } from '../setupTests';
import JobDetailsPage from './JobDetailsPage';
import { GET_JOB } from '../queries/JobQueries';
import { makeMock, mockResponseType } from '../queries/MockApollo';
import PrivateRoute from '../PrivateRoute';

describe('JobDetailsPage tests', () => {
  const user = { user: { username: 'user', password: 'user' } };

  it('should render', () => {
    const { container } = render(<JobDetailsPage />, undefined, user);
    expect(container).toMatchSnapshot();
  });

  it('should render error alert', async () => {
    const mockData = {
      query: GET_JOB,
      variables: { id: 1 },
      response: {
        job: {
        },
      },
    };

    render(<JobDetailsPage errorAutoHide={100} />, [makeMock(mockData, mockResponseType.ERROR)], user);
    expect(await screen.findByTestId('job-details-error')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('job-details-error'));
  });

  it('should render job details', async () => {
    const mockData = {
      query: GET_JOB,
      variables: { id: 1 },
      response: {
        job: {
          id: 1,
          name: 'Senior Frontend Engineer (ReactJS)',
          description: "We're hiring! Start your career as a UI developer",
          company: {
            name: 'Modus Create',
            user: {
              firstName: 'Management',
              lastName: 'Modus',
            },
            contactInfo: {
              email: 'contact@moduscreate.com',
              phone: '+40-0786-887-444',
              city: 'Cluj Napoca',
              country: {
                name: 'Romania',
              },
              website: 'https://moduscreate.com/',
              avatarUrl: 'https://api.adorable.io/avatars/285/abott@adorable.png',
              about: 'Digital transformation company ...',
            },
          },
          jobSkills: [
            {
              skill: {
                name: 'HTML',
              },
              rating: 3,
            },
            {
              skill: {
                name: 'CSS',
              },
              rating: 3,
            },
            {
              skill: {
                name: 'JS',
              },
              rating: 3,
            },
            {
              skill: {
                name: 'React',
              },
              rating: 4,
            },
          ],
          jobRequirements: [
            {
              name: 'Played with HTML, CSS, JS before',
            },
            {
              name: 'Knows his/her ways with colors',
            },
            {
              name: '99+ years experience would be nice',
            },
          ],
          jobBenefits: [
            {
              name: 'Cool teammates',
            },
            {
              name: 'Open space, open minded',
            },
            {
              name: 'We have a ping-pong table',
            },
          ],
        },
      },
    };

    render(<PrivateRoute component={JobDetailsPage} path="/jobs/:id" to="/login" exact />, [makeMock(mockData, mockResponseType.SUCCESS)], user, '/jobs/1');
    expect(await screen.findByTestId('job-details-data')).toBeInTheDocument();
  });
});
