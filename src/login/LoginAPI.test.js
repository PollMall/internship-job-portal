import React from 'react';
import { mockLoginUser } from './LoginAPI';

describe('testing API calls', () => {
  it.each([
    ['admin', 'admin', true],
    ['test', 'test', false],
    ['test', '', false],
    ['', 'test', false],
    ['', '', false],
  ])('user: %s, pass: %s', (user, pass, expected) => {
    expect(mockLoginUser(user, pass)).toEqual({ success: expected });
  });
});
