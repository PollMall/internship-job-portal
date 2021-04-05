import React from 'react';
import { Typography } from '@material-ui/core';

function ContactInfoPreview({ contactInfo }) {
  return (
    <>
      <Typography component="p" variant="body2">
        {contactInfo?.email}
      </Typography>
      <Typography component="p" variant="body2">
        {contactInfo?.phone}
      </Typography>
      <Typography component="p" variant="body2">
        {contactInfo?.city}
      </Typography>
      <Typography component="p" variant="body2">
        {contactInfo?.country.name}
      </Typography>
      <Typography component="p" variant="body2">
        {contactInfo?.website}
      </Typography>
    </>
  );
}

export default ContactInfoPreview;
