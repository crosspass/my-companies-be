import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import _ from 'lodash';
import { history } from 'umi';

import * as articleService from '../services/articles';

export default {
  namespace: 'articles',
  state: {
    list: [],
    current: null,
    stats: [],
    year: new Date().getFullYear(),
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { articles, message } = yield call(articleService.fetch, payload);
      yield put({
        type: 'setYear',
        payload: payload.year,
      });
      yield put({
        type: 'fetchArticles',
        payload: articles,
      });
    },
    *stats({ year }: { year: string }, { call, put }) {
      const { stats, message } = yield call(articleService.stats, year);
      yield put({
        type: 'setStats',
        payload: stats || [],
      });
    },
    *fetchOne({ articleID }, { call, put }) {
      const { article } = yield call(articleService.fetchOne, articleID);
      yield put({
        type: 'fetchArticle',
        payload: article,
      });
    },
    *save({ payload }, { call }) {
      const { article } = yield call(articleService.save, payload);
      message.info('保存成功!');
      history.push(`/articles/${article.ID}/edit`);
    },
    *update({ payload }, { call }) {
      yield call(articleService.update, payload);
      message.info('保存成功!');
    },
    *delete({ payload }, { call, put }) {
      const { article, message } = yield call(
        articleService.markDeleted,
        payload,
      );
      if (message == 'ok') {
        yield put({
          type: 'deleteArticle',
          payload: payload,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/articles') {
          const year = new Date().getFullYear();
          const payload = { page: 0, year: `${year}` };
          dispatch({ type: 'fetch', payload });
          dispatch({ type: 'stats', year });
        }
        const match =
          pathToRegexp('/articles/:id').exec(pathname) ||
          pathToRegexp('/articles/:id/edit').exec(pathname);
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
      const filteredList = _.filter(state.list, (v) => v.ID != payload);
      return { ...state, list: filteredList };
    },
    setStats(state, { payload }) {
      return { ...state, stats: payload };
    },
    setYear(state, { payload }) {
      return { ...state, year: payload };
    },
  },
};
