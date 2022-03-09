import * as React from 'react';
import { FunctionComponent } from 'react';
import './DesktopHomePage.scss';
import MyImage from '../../common/MyImage/MyImage';
import { AppMode } from '../../../const/interface';
import { Row, RowC, RowCS } from '../../common/StyledElements';
import { Divider } from 'antd';
import MyAvatar from '../../common/MyAvatar/MyAvatar';
import SocialLogin from '../../../modules/authorization/SocialLogin/SocialLogin';
import clsx from 'clsx';
import cookie from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInforAction } from '../../../modules/redux/actions/userAction';
import useCheckAuthor from '../../../hook/useCheckAuthor';
import { TokenKeyName } from '../../../const/constant';
import { configs } from '../../../utils/serverConfig';
import LoginForm from './Login/LoginForm';

interface DesktopHomePageProps {
  mode?: AppMode;
}
const DesktopHomePage: FunctionComponent<DesktopHomePageProps> = ({
  mode = 'desktop',
}) => {
  return (
    <div className={clsx('desktop-home-page', mode)}>
      <div className='container'>
        <div className='login'>
          <div className='title'>VUI LÒNG ĐĂNG NHẬP</div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
