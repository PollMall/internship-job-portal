import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { UserContext } from '../UserProvider';
import { GET_USERS } from '../queries/UserQueries';
import UsersTable from './UsersTable';
import useStyles from './useStyles';
import Info from '../Info';

function AdminPage({ errorAutoHide = 2500 }) {
  const classes = useStyles();
  const {
    data, loading, error, refetch,
  } = useQuery(GET_USERS);
  const { state } = useContext(UserContext);

  return (
    <>
      <Typography className={classes.pageTitle} variant="h4">
        List of users
      </Typography>
      <Info loading={loading} error={!!error} errorAutoHide={errorAutoHide} />
      {data
      && (
      <UsersTable
        users={data.users?.filter((u) => (state?.user.id !== u.id))}
        refetch={refetch}
      />
      )}
    </>
  );
}

export default AdminPage;
