import {
  Grid, TextField, Button, InputLabel,
} from '@material-ui/core';
import Select from 'react-select';
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import useStyles from './useStyles';
import { GET_USER_ROLES, CREATE_USER, UPDATE_USER } from '../queries/UserQueries';
import Info from '../Info';

export const validateUser = (
  username, firstName, lastName, password, userRole, callback,
) => (
  callback(!!(username && firstName && lastName && password && userRole)));

function UserForm({ user, callApi, errorAutoHide = 2500 }) {
  const [username, setUsername] = React.useState(user?.username || '');
  const [firstName, setFirstName] = React.useState(user?.firstName || '');
  const [lastName, setLastName] = React.useState(user?.lastName || '');
  const [password, setPassword] = React.useState(user?.password || '');
  const [userRole, setUserRole] = React.useState(user?.userRole ? user.userRole : '');
  const [showError, setShowError] = React.useState(false);
  const [valid, setValid] = React.useState(!!user);
  const { data, loading } = useQuery(GET_USER_ROLES);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const classes = useStyles();

  React.useEffect(() => {
    validateUser(username, firstName, lastName, password, userRole, setValid);
  }, [username, firstName, lastName, password, userRole]);

  const memoUserRoles = React.useMemo(() => (
    data?.userRoles.map((ur) => ({ value: ur, label: ur.name }))
  ), [data]);

  const onClick = async () => {
    const variables = {
      username, firstName, lastName, password, userRoleId: userRole.id,
    };
    try {
      if (user) {
        callApi(updateUser, { ...variables, id: user.id });
      } else {
        callApi(createUser, { ...variables });
      }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="text"
            label="First name"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            type="text"
            label="Last name"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            type="text"
            label="Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputLabel id="user-role">
            User role
            <Select
              name="user-role"
              aria-labelledby="user-role"
              data-testid="admin-user-role"
              options={memoUserRoles}
              defaultValue={{ value: userRole, label: userRole?.name }}
              onChange={(e) => setUserRole(e.value)}
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
