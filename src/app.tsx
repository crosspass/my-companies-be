import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { RequestOptionsInit } from 'umi-request';
import { history, RequestConfig } from 'umi';
import pathToRegexp from 'path-to-regexp';

import RightContent from '@/components/headers/right_content';
import * as userService from './services/user';

import { getToken } from '@/utils/localdb';

function getMenuData(menuItmes) {
  console.log(menuItmes);
  console.log(history);
  let match = pathToRegexp('/companies/:code/:sub').exec(
    history.location.pathname,
  );
  if (match) {
    const code = match[1];
    return [
      {
        key: `company_finances`,
        locale: 'menu.企业财务数据',
        name: '企业财务数据',
        path: `/companies/${code}/finances`,
        pro_layout_parentKeys: [],
        routes: null,
      },
      {
        key: `company_csvs`,
        locale: 'menu.企业相关数据',
        name: '企业相关数据',
        path: `/companies/${code}/csvs`,
        pro_layout_parentKeys: [],
        routes: null,
      },
      {
        key: `company_articles`,
        locale: 'menu.企业笔记',
        name: '企业笔记',
        path: `/companies/${code}/articles`,
        pro_layout_parentKeys: [],
        routes: null,
      },
    ];
  }
  return menuItmes;
}

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  fetchUserInfo: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { user } = await userService.info();
      return user;
    } catch (error) {
      window.location.href = '/login';
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/login') {
    const currentUser = await fetchUserInfo();
    return {
      currentUser,
      fetchUserInfo,
    };
  }
  return {
    fetchUserInfo,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  console.log('initialState', initialState);
  const { currentUser } = initialState;
  const pure = location.pathname == '/login';
  return {
    rightContentRender: () => <RightContent />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/login') {
        window.location.href = '/login';
      }
    },
    pure: pure,
    menuHeaderRender: undefined,
    menuDataRender: getMenuData,
    ...initialState?.settings,
  };
};

const addToken = (url: string, options: RequestOptionsInit) => {
  const token = getToken();
  console.log('addToken', token);
  const headers = {
    Token: `${token}`,
  };
  return {
    url,
    options: { ...options, headers },
  };
};

export const request: RequestConfig = {
  requestInterceptors: [addToken],
};
