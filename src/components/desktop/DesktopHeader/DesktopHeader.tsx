import clsx from 'clsx';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { AppMode } from '../../../const/interface';
import MenuDrawer from '../../common/MenuDrawer/MenuDrawer';
import MyAvatar from '../../common/MyAvatar/MyAvatar';
import { RowC, RowCS } from '../../common/StyledElements';
import { activeMenus } from '../LeftMenu/menu';
import './DesktopHeader.scss';

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
        <RowC className='header'>Quản lý học sinh</RowC>
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
