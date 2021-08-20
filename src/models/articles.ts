import * as articleService from '../services/articles'
import pathToRegexp from 'path-to-regexp'
import _ from 'lodash'

export default {
  namespace: 'articles',
  state: {
    list: [],
    current: null,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { articles, message } = yield call(articleService.fetch, payload);
      console.log('response articles', articles)
      yield put({
        type: 'fetchArticles',
        payload: articles,
      });
    },
    *fetchOne({ articleID }, { call, put }) {
      const { article, message } = yield call(articleService.fetchOne, articleID);
      console.log('response articles', article)
      yield put({
        type: 'fetchArticle',
        payload: article,
      });
    },
    *save({ payload }, { call }) {
      const { article, message } = yield call(articleService.save, payload);
    },
    *update({ payload }, { call }) {
      const { article, message } = yield call(articleService.update, payload);
    },
    *delete({ payload }, { call, put }) {
      const { article, message } = yield call(articleService.markDeleted, payload);
      if (message == 'ok') {
        yield put({
          type: "deleteArticle",
          payload: payload
        })
      }
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
        const match = pathToRegexp('/articles/:id').exec(pathname) || pathToRegexp('/articles/:id/edit').exec(pathname);
        if (match) {
          const articleID = match[1];
          dispatch({ type: 'fetchOne', articleID });
        }
      });
    },
  },
  reducers: {
    fetchArticles(state, { payload }) {
      return { ...state, list: payload };
    },
    fetchArticle(state, { payload }) {
      return { ...state, current: payload };
    },
    updateContent(state, { payload }) {
      return { ...state, current: payload };
    },
    deleteArticle(state, { payload }) {
      const filteredList = _.filter(state.list, v => (v.ID != payload))
      return { ...state, list: filteredList }
    },
  },
}