import * as userService from '../services/user'
import { history } from 'umi';
import pathToRegexp from 'path-to-regexp'

// type interface Company {
// }

const token = localStorage.getItem('token')

export default {
  namespace: 'user',
  state: {
    token: token,
  },
  effects: {
    *login({ payload: values }, { call, put }) {
      const { token, message } = yield call(userService.login, values);
      localStorage.setItem('token', token)
      yield put({
        type: 'setToken',
        payload: { token },
      });
      window.location.href = '/';
    },
    *register({payload: values}, { call, put }) {
      console.log('values', values)
      const { company, message } = yield call(userService.register, values);
      yield put({
        type: 'addComment',
        payload: { company },
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
          dispatch({ type: 'fetchIncomes', payload: code });
          dispatch({ type: 'fetchCashFlows', payload: code });
          dispatch({ type: 'fetchBalances', payload: code });
        }
      });
    },
  },
  reducers: {
    setToken(state, { payload }) {
      console.log('payload')
      console.log(payload)
      console.log('payload')
      return { ...state, token: payload.token };
    },
  },
}