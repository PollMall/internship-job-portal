import React from 'react';
import {
  Card, CardContent, Typography,
} from '@material-ui/core';

function JobDetailsSection({ fields }) {
  return (
    <Card>
      <CardContent>
        {fields?.map((f) => (
          <>
            <Typography variant="h6">{f.title}</Typography>
            { f.data?.map((text) => (<Typography variant="body2" component={f.component}>{text}</Typography>))}
          </>
        ))}
      </CardContent>
    </Card>
  );
}

export default JobDetailsSection;
