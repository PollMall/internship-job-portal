import {
  Grid, TextField, Button, InputLabel,
} from '@material-ui/core';
import Select from 'react-select';
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import useStyles from './useStyles';
import { GET_USER_ROLES, CREATE_USER, UPDATE_USER } from '../queries/UserQueries';
import Info from '../Info';

export const validateUser = (user, callback) => (
  callback(!!(user?.username && user?.firstName && user?.lastName && user?.password && user?.userRole)));

function UserForm({ user, callApi, errorAutoHide = 2500 }) {
  const [newUser, setNewUser] = React.useState(user);
  const [showError, setShowError] = React.useState(false);
  const [valid, setValid] = React.useState(!!user);
  const { data, loading } = useQuery(GET_USER_ROLES);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const classes = useStyles();

  React.useEffect(() => {
    validateUser(newUser, setValid);
  }, [newUser]);

  const memoUserRoles = React.useMemo(() => (
    data?.userRoles.map((ur) => ({ value: ur, label: ur.name }))
  ), [data]);

  const onClick = async () => {
    const variables = {
      ...newUser, userRoleId: newUser?.userRole.id,
    };
    try {
      const func = user ? updateUser : createUser;
      callApi(func, variables);
      setShowError(false);
    } catch (ex) {
      setShowError(true);
    }
  };

  return (
    <Grid className={classes.modal} container alignItems="center" direction="column">
      <Info loading={loading} error={showError} errorAutoHide={errorAutoHide} />
      {data
      && (
      <>
        <h2>User Form</h2>
        <form className={classes.form}>
          <TextField
            type="text"
            label="Username"
            name="username"
            id="username"
            value={newUser?.username || ''}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            type="text"
            label="First name"
            name="firstName"
            id="firstName"
            value={newUser?.firstName || ''}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />
          <TextField
            type="text"
            label="Last name"
            name="lastName"
            id="lastName"
            value={newUser?.lastName || ''}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />
          <TextField
            type="text"
            label="Password"
            name="password"
            id="password"
            value={newUser?.password || ''}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <InputLabel id="user-role">
            User role
            <Select
              name="user-role"
              aria-labelledby="user-role"
              data-testid="admin-user-role"
              options={memoUserRoles}
              defaultValue={newUser && { value: newUser.userRole, label: newUser.userRole?.name }}
              onChange={(e) => setNewUser({ ...newUser, userRole: e.value })}
            />
          </InputLabel>
        </form>
        <Button disabled={!valid} variant="contained" color="primary" fullWidth onClick={onClick}>
          save
        </Button>
      </>
      )}
    </Grid>
  );
}

export default UserForm;
