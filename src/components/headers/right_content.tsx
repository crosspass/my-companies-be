import React, { useCallback } from 'react';
import { Space, Avatar, Button, Dropdown, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { deleteToken } from '@/utils/localdb';

/**
 * 退出登录，并且将当前的 url 保存
 */
const logout = () => {
  deleteToken();
  const { query, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
    });
  }
};

const AvatarMenu: React.FC<{}> = () => {
  const { setInitialState, initialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      console.log('logout event!');
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: undefined });
        logout();
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const loading = (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  );
  if (!initialState) {
    return loading;
  }
  const { currentUser } = initialState;
  if (!currentUser || !currentUser.Email) {
    return loading;
  }
  const UserMenu = (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <Button type="text" onClick={onMenuClick}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={UserMenu}>
      <Avatar
        style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        size={40}
      >
        {currentUser?.Email}
      </Avatar>
    </Dropdown>
  );
};

const GlobalHeaderRight: React.FC<{}> = () => {
  return (
    <Space>
      <AvatarMenu />
    </Space>
  );
};
export default GlobalHeaderRight;
