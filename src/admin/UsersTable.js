import React from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useMutation } from '@apollo/client';
import useStyles from './useStyles';
import UserRow from './UserRow';
import { DELETE_USER } from '../queries/UserQueries';
import UserForm from './UserForm';

function UsersTable({ users, refetch }) {
  const classes = useStyles();
  const [deleteUser] = useMutation(DELETE_USER);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const callApi = async (func, variables) => {
    try {
      await func({ variables });
      refetch();
      setShowModal(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  const onDelete = async (id) => {
    callApi(deleteUser, { id });
  };

  const onEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  return (
    <>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">First name</TableCell>
              <TableCell align="right">Last name</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((u) => (
              <UserRow key={u.id} user={u} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab data-testid="admin-fab" className={classes.fab} color="primary" onClick={onAdd}>
        <AddIcon />
      </Fab>
      <Modal data-testid="admin-modal" open={showModal} onClose={onClose}>
        <Paper>
          <UserForm user={selectedUser} callApi={callApi} />
        </Paper>
      </Modal>
    </>
  );
}

export default UsersTable;
