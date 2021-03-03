import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="display-flex">
      <h1 className="text-center">Page Not Found</h1>
      <p className="text-center">It looks like you&apos;re lost. There is nothing here.</p>
      <Link to="/" className="center-block text-center" data-testid="page-not-found-link">Go back to main page.</Link>
    </div>
  );
}

export default PageNotFound;
