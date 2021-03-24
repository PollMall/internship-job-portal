import React from 'react';
import {
  TableRow, TableCell, Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './useStyles';

function UserRow({ user, onDelete, onEdit }) {
  const classes = useStyles();

  const handleDelete = async (event) => {
    event.stopPropagation();
    await onDelete(user.id);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEdit(user);
  };

  return (
    <TableRow data-testid="admin-user-row" className={classes.tableRow} onClick={handleEdit}>
      <TableCell component="th" scope="row">
        {user?.username}
      </TableCell>
      <TableCell align="right">
        {user?.firstName}
      </TableCell>
      <TableCell align="right">
        {user?.lastName}
      </TableCell>
      <TableCell align="right">
        {user?.password}
      </TableCell>
      <TableCell align="right">
        {user?.userRole?.name}
      </TableCell>
      <TableCell align="right">
        <Button data-test-id="admin-delete-btn" onClick={handleDelete}><DeleteIcon /></Button>
      </TableCell>
    </TableRow>
  );
}

export default UserRow;
