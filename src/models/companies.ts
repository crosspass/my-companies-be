import * as companyService from '../services/company'
import * as userService from '../services/user'

export default {
  namespace: 'companies',
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
    *star({ payload }, { call, put }) {
      const { company, message } = yield call(userService.starCompany, payload);
      yield put({
        type: 'starCompany',
        payload: company
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
    starCompany(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },
  },
}