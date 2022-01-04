import * as businessService from '../services/business';
import _ from 'lodash';

export default {
  namespace: 'businesses',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { businesses, message } = yield call(businessService.fetch, {
        page,
      });
      yield put({
        type: 'fetchBusinesses',
        payload: {
          businesses,
          page: page,
        },
      });
    },
    *create({ payload }, { call, put }) {
      const { business, message } = yield call(businessService.create, payload);
      yield put({
        type: 'addBusiness',
        payload: {
          business,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/businesses') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
  reducers: {
    fetchBusinesses(state, { payload }) {
      return { ...state, list: payload.businesses };
    },
    starCompany(state, { payload }) {
      if (_.find(state.list, { ID: payload.ID })) {
        return state;
      } else {
        return { ...state, list: [...state.list, payload] };
      }
    },
  },
};
