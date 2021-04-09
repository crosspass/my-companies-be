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
    { path: '/companies', component: '@/pages/companies', name: '关注的公司' },
  ],
  fastRefresh: {},
});
