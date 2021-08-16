import * as articleService from '../services/articles'

export default {
  namespace: 'articles',
  state: {
    list: []
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { companies, message } = yield call(articleService.fetch, { page });
      yield put({
        type: 'fetchCompanies',
        payload: {
          companies,
          page: page
        },
      });
    },
    *save({ payload: values }, { call }) {
      const { article, message } = yield call(articleService.save, values);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/companies') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
  reducers: {
    fetchCompanies(state, { payload }) {
      return { ...state, list: payload.companies };
    },
  },
}