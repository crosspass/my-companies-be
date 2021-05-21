import * as companyService from '../services/company'
import pathToRegexp from 'path-to-regexp'

// type interface Company {
// }

export default {
  namespace: 'company',
  state: {
    current: null,
    comments: [],
  },
  effects: {
    *fetch({ payload: id }, { call, put }) {
      console.log('id', id);
      const { company, message } = yield call(companyService.fetchCompany, id);
      yield put({
        type: 'fetchCompany',
        payload: { company },
      });
    },
    *createComment({payload: values}, { call, put }) {
      console.log('payload', values);
      const { company, message } = yield call(companyService.createComment, values);
      yield put({
        type: 'addComment',
        payload: { company },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/companies/:id').exec(pathname);
        if (match) {
          const companyId = match[1];
          dispatch({ type: 'fetch', payload: companyId });
        }
      });
    },
  },
  reducers: {
    fetchCompany(state, { payload }) {
      return { ...state, current: payload.company };
    },
    addComment(state, { payload }) {
      return { ...state, comments: payload };
    },
  },
}