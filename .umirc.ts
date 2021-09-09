import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: '公司财报跟踪',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login' },
    { path: '/companies', component: '@/pages/companies', name: '关注的公司' },
    { path: '/companies/:code', component: '@/pages/company' },
    { path: '/companies/:code/csvs', component: '@/pages/csvs' },
    { path: '/articles/new', component: '@/pages/new_article' },
    { path: '/articles/:id', component: '@/pages/article' },
    { path: '/articles/:id/edit', component: '@/pages/edit_article' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      'target': 'http://localhost:8080/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
