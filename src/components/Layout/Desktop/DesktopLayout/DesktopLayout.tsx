import { FunctionComponent } from 'react';
import * as React from 'react';
import { Layout } from 'antd';
import './DesktopLayout.scss';
import DesktopHeader from '../../../desktop/DesktopHeader/DesktopHeader';
import LeftMenu from '../../../desktop/LeftMenu/LeftMenu';
import { Col } from '../../../common/StyledElements';
import DesktopFooter from '../../../desktop/DesktopFooter/DesktopFooter';
import { AppMode } from '../../../../const/interface';
import clsx from 'clsx';

const { Header, Content, Sider } = Layout;

interface DesktopLayoutProps {
  mode?: AppMode;
}
const DesktopLayout: FunctionComponent<DesktopLayoutProps> = (props) => {
  const { children, mode = 'desktop' } = props;
  return (
    <div className={clsx('desktop-layout', mode)}>
      <Layout className='dektop-layout-main'>
        <Header className='header'>
          <DesktopHeader mode={mode} />
        </Header>
        <Layout className='dektop-layout-container'>
          {mode === 'desktop' && (
            <Sider width={240} className='site-layout-background'>
              <LeftMenu />
            </Sider>
          )}
          <Layout>
            <Content className='dektop-layout-content'>
              <div className='dektop-layout-content-main'>{children}</div>
              <DesktopFooter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default DesktopLayout;
