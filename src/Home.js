import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserProvider';

function Home() {
  const [state] = useContext(UserContext);

  return (
    <div>
      {state.user
        ? <h2>Welcome</h2>
        : <Redirect to="/login" />}
    </div>
  );
}

export default Home;
