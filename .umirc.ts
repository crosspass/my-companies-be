import { defineConfig } from 'umi';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
  proxy: {
    '/api': {
      'target': 'http://localhost:8080/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
