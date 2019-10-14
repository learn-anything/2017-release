import mapReducer from 'reducers/mapReducer';
import { map } from 'constants/actions.json';

describe('reducers - mapReducer', () => {
  let state;

  beforeEach(() => {
    state = mapReducer(undefined, {});
    history.pushState(null, null, '/');
  });


  it('should return initial state', () => {
    expect(mapReducer(undefined, {})).toEqual({
      title: '',
      nodes: [],
      connections: [],
      loading: false,
      error: undefined,
    });
  });


  it('should set loading to true', () => {
    expect(mapReducer(state, { type: map.fetchUpdate.pending }))
      .toEqual({ ...state, loading: true });

    expect(mapReducer(state, { type: map.fetch.pending }))
      .toEqual({ ...state, loading: true });
  });


  it('should update fetched maps and push new url to window.history', () => {
    const response = {
      title: 'path - to - map',
      nodes: [
        { text: 'node 1' },
        { text: 'node 2' },
      ],
      connections: [
        { source: 'node 1', target: 'node 2' },
      ],
    };

    const action = {
      type: map.fetchUpdate.fulfilled,
      payload: { data: response },
    };

    expect(mapReducer(state, action)).toEqual({
      ...state,
      title: response.title,
      nodes: response.nodes,
      connections: response.connections,
    });
    expect(document.title).toEqual('map - Learn Anything');
    expect(location.pathname).toEqual('/path/to/map');
  });

  it('should update fetched maps', () => {
    const response = {
      title: 'path - to - map',
      nodes: [
        { text: 'node 1' },
        { text: 'node 2' },
      ],
      connections: [
        { source: 'node 1', target: 'node 2' },
      ],
    };

    const action = {
      type: map.fetch.fulfilled,
      payload: { data: response },
    };

    expect(mapReducer(state, action)).toEqual({
      ...state,
      title: response.title,
      nodes: response.nodes,
      connections: response.connections,
    });
    expect(document.title).toEqual('map - Learn Anything');
    expect(location.pathname).toEqual('/');
  });


  it('should set error', () => {
    const error = 'whoopsie, couldn\'t get your map';

    expect(mapReducer(state, { type: map.fetchUpdate.rejected, payload: error }))
      .toEqual({ ...state, error });

    expect(mapReducer(state, { type: map.fetch.rejected, payload: error }))
      .toEqual({ ...state, error });
  });
});