import { MenuOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer } from 'antd';
import { FunctionComponent, useState } from 'react';
import LeftMenu from '../../desktop/LeftMenu/LeftMenu';
import MyImage from '../MyImage/MyImage';
import { RowC } from '../StyledElements';
import './MenuDrawer.scss';

interface MenuDrawerProps {}
const MenuDrawer: FunctionComponent<MenuDrawerProps> = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className='menu-drawer'>
      <Button
        className='icon'
        type='text'
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />
      <Drawer
        title={
          <RowC className='header'>
            <MyImage src='/images/logo.svg' width={80} height={21} />
            <Divider type='vertical' style={{ background: 'white' }} />
            Affiliate
          </RowC>
        }
        placement='left'
        onClose={onClose}
        closeIcon={null}
        visible={visible}
        width='75%'
        className='my-menu-drawer'
        // destroyOnClose
      >
        <LeftMenu />
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
