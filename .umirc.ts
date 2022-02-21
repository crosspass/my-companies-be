import { defineConfig } from 'umi';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: '公司财报跟踪',
  },
  routes: [
    { path: '/', redirect: '/companies' },
    { path: '/login', component: '@/pages/login' },
    { path: '/companies', component: '@/pages/companies', name: '关注的公司' },
    { path: '/articles', component: '@/pages/index', name: '我的投资笔记' },
    { path: '/businesses', component: '@/pages/businesses', name: '生意' },
    { path: '/tops', component: '@/pages/tops', name: '排行' },
    { path: '/businesses/:id/stats', component: '@/pages/business/stats' },
    {
      path: '/companies/:code/csvs',
      component: '@/pages/company/csvs',
      hideInMenu: true,
      name: '企业相关数据',
    },
    {
      path: '/companies/:code/finances',
      component: '@/pages/company/finances',
      hideInMenu: true,
      name: '企业财务数据',
    },
    {
      path: '/companies/:code/articles',
      component: '@/pages/company/articles',
      hideInMenu: true,
      name: '企业笔记',
    },
    { path: '/articles/new', component: '@/pages/new_article' },
    { path: '/articles/:id', component: '@/pages/article' },
    { path: '/articles/:id/edit', component: '@/pages/edit_article' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  chainWebpack: (config, { webpack }) => {
    config
      .plugin('moment-locales')
      .use(MomentLocalesPlugin, [{ localesToKeep: ['zh-cn'] }]);
  },
});
