import * as articleService from '../services/articles'

export default {
  namespace: 'articles',
  state: {
    list: []
  },
  effects: {
    *fetch({ payload: values }, { call, put }) {
      const { articles, message } = yield call(articleService.fetch, values);
      console.log('response articles', articles)
      yield put({
        type: 'fetchArticles',
        payload: articles,
      });
    },
    *save({ payload: values }, { call }) {
      const { article, message } = yield call(articleService.save, values);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          const year = new Date().getFullYear()
          const payload = { page: 0, year: `${year}`}
          dispatch({ type: 'fetch', payload });
        }
      });
    },
  },
  reducers: {
    fetchArticles(state, { payload }) {
      return { ...state, list: payload };
    },
  },
}