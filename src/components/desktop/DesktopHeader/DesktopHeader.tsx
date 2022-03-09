import { Button, Divider } from 'antd';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { AppMode } from '../../../const/interface';
import MyAvatar from '../../common/MyAvatar/MyAvatar';
import MyImage from '../../common/MyImage/MyImage';
import { RowC, RowCC, RowCS } from '../../common/StyledElements';
import { activeMenus } from '../LeftMenu/menu';
import { MenuOutlined } from '@ant-design/icons';
import './DesktopHeader.scss';
import MenuDrawer from '../../common/MenuDrawer/MenuDrawer';
import clsx from 'clsx';

interface DesktopHeaderProps {
  mode?: AppMode;
}
const DesktopHeader: FunctionComponent<DesktopHeaderProps> = ({
  mode = 'desktop',
}) => {
  const { pathname } = useLocation();
  const selectedMenu = activeMenus[pathname] || {};
  const { icon, title } = selectedMenu;
  // console.log('selectedMenu', selectedMenu);

  return (
    <div className={clsx('desktop-header', mode)}>
      <RowCS className='content'>
        {mode === 'mobile' && <MenuDrawer />}
        <RowC className='header'>
          <MyImage src='/images/logo.svg' width={80} height={21} />
          <Divider type='vertical' style={{ background: 'white' }} />
          Affiliate
        </RowC>
        {mode === 'desktop' && (
          <RowC className='selected-path'>
            <RowC className='icon'>{icon}</RowC>
            <div className='title'>{title}</div>
          </RowC>
        )}
        <MyAvatar mode={mode} />
      </RowCS>
    </div>
  );
};

export default DesktopHeader;
