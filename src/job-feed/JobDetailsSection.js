import React from 'react';
import {
  Card, CardContent, Typography,
} from '@material-ui/core';

function JobDetailsField({ title, data, component }) {
  const memoData = React.useMemo(() => (data.length ? data.map((it) => (<Typography variant="body2" component={component}>{it}</Typography>)) : <Typography variant="body2">None</Typography>), [data, component]);

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      {memoData}
    </>
  );
}

function JobDetailsSection({ fields }) {
  const memoFields = React.useMemo(() => fields.map((it) => <JobDetailsField title={it.title} data={it.data} component={it.component} />), [fields]);

  return (
    <Card>
      <CardContent>
        {memoFields}
      </CardContent>
    </Card>
  );
}

export default JobDetailsSection;
