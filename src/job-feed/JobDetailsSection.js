import React from 'react';
import {
  Card, CardContent, Typography,
} from '@material-ui/core';

function JobDetailsSection({ fields }) {
  return (
    <Card>
      <CardContent>
        {fields?.map((f) => (
          <div key={f.id}>
            <Typography variant="h6">{f.title}</Typography>
            { f.data?.map((d) => (
              <Typography key={d.id} variant="body2" component={f.component}>{d.field}</Typography>))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default JobDetailsSection;
