import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: null };
}): BasicLayoutProps => {
  console.log('initialState', initialState)
  const pure = location.pathname == '/login'
  return {
     rightContentRender: () => <h2>Welcome</h2>,
    // onPageChange: () => {
    //   const { currentUser } = initialState;
    //   const { location } = history;
    //   // 如果没有登录，重定向到 login
    //   if (!currentUser && location.pathname !== '/user/login') {
    //     history.push('/user/login');
    //   }
    // },
    pure: pure,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};