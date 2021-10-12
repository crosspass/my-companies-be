import * as csvService from '../services/csvs'
import pathToRegexp from 'path-to-regexp'
import _ from "lodash"

// type interface Company {
// }

const token = localStorage.getItem('token')

export default {
  namespace: 'csvs',
  state: {
    code: '',
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
    *create({payload}, { call, put }) {
      console.log('values', payload)
      const { csv, message } = yield call(csvService.save, payload);
      yield put({
        type: 'addCsvToList',
        payload: csv
      });
    },
    *update({payload}, { call, put }) {
      console.log('values', payload)
      const { csv, message } = yield call(csvService.update, payload);
      yield put({
        type: 'updateCsvInList',
        payload: csv
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
    addCsvToList(state, { payload }) {
      return { ...state, list: [...state.list, payload]};
    },
    updateCsvInList(state, { payload }) {
      const i = _.findIndex(state.list, (v) => v.ID = payload.ID)
      return { ...state, list: [...state.list.slice(0,i), payload, ...state.list.slice(i+1)]};
    },
  },
}