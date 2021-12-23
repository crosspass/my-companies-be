import React from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import { history } from 'umi';

import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const gotoHome = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      window.location.href = '/';
      return;
    }
    window.location.href = redirect;
  }, 10);
};

const Login: React.FC<{ dispatch; user }> = ({ dispatch, user }) => {
  if (user.info) {
    gotoHome();
  }
  return (
    <div>
      <div
        style={{
          width: 330,
          margin: 'auto',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          <img
            style={{
              height: '44px',
              marginRight: 16,
            }}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          企业研究个人笔记
        </h1>
        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          企业经营研究笔记
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="登录" key="1">
            <ProForm
              onFinish={async (values) => {
                await dispatch({
                  type: 'user/login',
                  payload: values,
                });
                message.success('登录成功！');
              }}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
            >
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="email"
                placeholder="请输入邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
                placeholder="请输入密码"
              />
            </ProForm>
          </TabPane>
          {/* <TabPane tab="注册" key="2">
            <ProForm
              onFinish={async (values) => {
                await dispatch({
                  type: 'user/register',
                  payload: values,
                });
                message.success('提交成功');
              }}
              submitter={{
                searchConfig: {
                  submitText: '注册',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
            >
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="email"
                placeholder="请输入邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
                placeholder="请输入密码"
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="confirmedPassword"
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码',
                  },
                ]}
                placeholder="请再次输入密码"
              />
            </ProForm>
          </TabPrne> */}
        </Tabs>
      </div>
      <DefaultFooter
        links={[
          {
            key: 'beian',
            title: '粤ICP备2021170738号-1',
            href: 'https://beian.miit.gov.cn/',
            blankTarget: true,
          },
        ]}
        copyright="2021"
      />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  console.log('login page');
  console.log(state.user);
  console.log('login page');
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
