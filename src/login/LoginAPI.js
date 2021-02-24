// eslint-disable-next-line import/prefer-default-export
export const mockLoginUser = (username, password) => {
  let success;
  if (username === 'admin' && password === 'admin') {
    success = true;
  } else {
    success = false;
  }
  return { success };
};
