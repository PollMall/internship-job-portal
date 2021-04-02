import { reducer } from '../useUserProfile';

describe('useUserProfile tests', () => {
  it('should return Error', () => {
    const res = reducer({}, 'ERROR');
    expect(res).toEqual(Error('reducer action not supported'));
  });
});
