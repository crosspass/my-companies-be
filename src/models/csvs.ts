import * as csvService from '../services/csvs'
import pathToRegexp from 'path-to-regexp'

// type interface Company {
// }

const token = localStorage.getItem('token')

export default {
  namespace: 'csvs',
  state: {
    token: token,
    list: [],
  },
  effects: {
    *fetch({payload}, { call, put }) {
      console.log('values', payload)
      const { csvs, message } = yield call(csvService.fetch, { code: payload });
      yield put({
        type: 'setCsvs',
        payload: csvs || []
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/companies/:code/csvs').exec(pathname);
        if (match) {
          const code = match[1];
          dispatch({ type: 'fetch', payload: code });
          dispatch({ type: 'setCode', payload: code });
        }
      });
    },
  },
  reducers: {
    setCode(state, { payload }) {
      return { ...state, code: payload};
    },
    setCsvs(state, { payload }) {
      return { ...state, list: payload};
    },
  },
}