import { reducer } from './useUser';

describe('useUser tests', () => {
  it('should return errror', () => {
    const res = reducer({}, { type: 'anything' });
    expect(res).toEqual(Error('Reducer action not supported'));
  });
});
