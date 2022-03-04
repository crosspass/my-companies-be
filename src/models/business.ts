import * as businessService from '../services/business';
import pathToRegexp from 'path-to-regexp';

// type interface Company {
// }

export default {
  namespace: 'business',
  state: {
    current: null,
    stats: [],
  },
  effects: {
    *fetch({ payload: id }, { call, put }) {
      console.log('id', id);
      const { business, message } = yield call(
        companyService.fetchBusiness,
        id,
      );
      yield put({
        type: 'fetchBusiness',
        payload: { business },
      });
    },
    *fetchStats({ payload: id }, { call, put }) {
      const { business, stats, message } = yield call(
        businessService.fetchBusinessStats,
        id,
      );
      console.log('stats', stats);
      yield put({
        type: 'updateStats',
        payload: { business, stats },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let match = pathToRegexp('/businesses/:id/stats').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetchStats', payload: id });
        }
        match = pathToRegexp('/businesses/:id/articles').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetchArticles', payload: id });
        }
        match = pathToRegexp('/businesses/:id/csvs').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetch', payload: id });
        }
      });
    },
  },
  reducers: {
    fetchBusiness(state, { payload }) {
      return { ...state, current: payload.business };
    },
    updateStats(state, { payload }) {
      return { ...state, current: payload.business, stats: payload.stats };
    },
  },
};
