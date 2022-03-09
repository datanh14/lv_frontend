import { FunctionComponent } from 'react';
import * as React from 'react';
import { Layout } from 'antd';
import './MobileLayout.scss';

interface MobileLayoutProps {}
const MobileLayout: FunctionComponent<MobileLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className='mobile-layout'>
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </div>
  );
};

export default MobileLayout;
