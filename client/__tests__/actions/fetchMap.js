import fetchMap from 'actions/fetchMap';
import { map } from 'constants/actions.json';

describe('actions - fetchMap', () => {
  it('should create action to fetch a map and update page', () => {
    const id = '42';
    const expectedAction = {
      type: map.fetchUpdate.def,
      payload: new Promise(() => {}),
    };

    expect(fetchMap(id)).toEqual(expectedAction);
    expect(fetchMap(id, true)).toEqual(expectedAction);
  });

  it('should create action to fetch a map without updating page', () => {
    const id = '42';
    const expectedAction = {
      type: map.fetch.def,
      payload: new Promise(() => {}),
    };

    expect(fetchMap(id, false)).toEqual(expectedAction);
  });
});
