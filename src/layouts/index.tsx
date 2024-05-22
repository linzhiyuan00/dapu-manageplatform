import React from 'react';
import styles from './index.less';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';


const BasicLayout: React.FC = props => {
  return (
    <ConfigProvider locale={zhCN}>
      {props.children}
    </ConfigProvider>
  );
};

export default BasicLayout;
