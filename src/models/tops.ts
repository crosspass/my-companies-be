import * as topsService from '../services/tops';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'tops',
  state: {
    roes: [],
    roeIncreases: [],
    roas: [],
    roaIncreases: [],
  },
  effects: {
    *fetchRoa({ params }, { call, put }) {
      const { roas, message } = yield call(topsService.roa, params);
      yield put({
        type: 'addRoas',
        payload: { roas },
      });
    },
    *fetchRoaIncrease({ params }, { call, put }) {
      const { roaIncreases, message } = yield call(
        topsService.roaIncrease,
        params,
      );
      yield put({
        type: 'addRoaIncreases',
        payload: { roaIncreases },
      });
    },
    *fetchRoe({ params }, { call, put }) {
      const { roes, message } = yield call(topsService.roe, params);
      yield put({
        type: 'addRoes',
        payload: { roes },
      });
    },
    *fetchRoeIncrease({ params }, { call, put }) {
      const { roeIncreases, message } = yield call(
        topsService.roeIncrease,
        params,
      );
      yield put({
        type: 'addRoeIncreases',
        payload: { roeIncreases },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/tops').exec(pathname);
        if (match) {
          const code = match[1];
          dispatch({ type: 'fetchRoa' });
          dispatch({ type: 'fetchRoaIncrease' });
          dispatch({ type: 'fetchRoe' });
          dispatch({ type: 'fetchRoeIncrease' });
        }
      });
    },
  },
  reducers: {
    addRoas(state, { payload }) {
      return { ...state, roas: payload.roas };
    },
    addRoaIncreases(state, { payload }) {
      return { ...state, roaIncreases: payload.roaIncreases };
    },
    addRoes(state, { payload }) {
      return { ...state, roes: payload.roes };
    },
    addRoeIncreases(state, { payload }) {
      return { ...state, roeIncreases: payload.roeIncreases };
    },
  },
};
