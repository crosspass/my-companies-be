import * as companyService from '../services/company'

export default {
  namespace: 'company',
  state: {
    list: []
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { companies, message } = yield call(companyService.fetch, { page });
      yield put({
        type: 'fetchCompanies',
        payload: {
          companies,
          page: page
        },
      });
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