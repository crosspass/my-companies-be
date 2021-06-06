import * as companyService from '../services/company'
import pathToRegexp from 'path-to-regexp'

// type interface Company {
// }

export default {
  namespace: 'company',
  state: {
    current: null,
    comments: [],
    reportSummaries: [],
  },
  effects: {
    *fetch({ payload: code }, { call, put }) {
      console.log('id', code);
      const { company, message } = yield call(companyService.fetchCompany, code);
      yield put({
        type: 'fetchCompany',
        payload: { company },
      });
    },
    *createComment({payload: values}, { call, put }) {
      const { company, message } = yield call(companyService.createComment, values);
      yield put({
        type: 'addComment',
        payload: { company },
      });
    },
    *fetchReportSummaries({payload: code}, { call, put }) {
      const { reportSummaries, message } = yield call(companyService.reportSummaries, code);
      console.log('fetch report summaries payload', code);
      yield put({
        type: 'addReportSummaries',
        payload: { reportSummaries },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/companies/:code').exec(pathname);
        if (match) {
          const code = match[1];
          dispatch({ type: 'fetch', payload: code });
          dispatch({ type: 'fetchReportSummaries', payload: code });
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
    addReportSummaries(state, { payload }) {
      return { ...state, reportSummaries: payload.reportSummaries };
    },
  },
}