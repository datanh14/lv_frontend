import Cookie from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import {
  Route,
  Routes as Routeses,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import * as constants from '../../const/constant';
import MobileLayout from '../../components/Layout/Mobile/MobileLayout/MobileLayout';
import DesktopLayout from '../../components/Layout/Desktop/DesktopLayout/DesktopLayout';
import { routerConfig } from './routerConfig';
import { isMobileAndTabletCheck } from '../../utils/helpers';
import NotFoundPage from '../../components/desktop/NotFoundPage/NotFoundPage';
import useCheckAuthor from '../../hook/useCheckAuthor';
import { useSelector } from 'react-redux';
import MyLoading from '../../components/common/MyLoading/MyLoading';

const Routes = () => {
  const [Update, setUpdate] = useState(Date.now());
  //?----------- check screen type mobile|desktop ------------//
  // const isMobileDisplay = useRef(isMobileAndTabletCheck());
  // const isMobile = isMobileAndTabletCheck();

  // const checkDisplayType = useCallback(() => {
  //   const newValue = isMobileAndTabletCheck();
  //   if (isMobile !== newValue) {
  //     isMobileDisplay.current = newValue;
  //     // window.location.reload();
  //     setUpdate(Date.now());
  //   }
  // }, [isMobile]);
  useCheckAuthor();

  useEffect(() => {
    function check() {
      // setTimeout(checkDisplayType, 0);
      setUpdate(Date.now());
      setTimeout(() => setUpdate(Date.now()), 0);
    }
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
    };
  }, []);

  const location = useLocation();
  let navigate = useNavigate();
  const userInfo = localStorage.getItem('token-key') || '';
  useEffect(() => {
    if (location.pathname !== '/' && userInfo.length === 0) {
      navigate('/');
    }
    if (location.pathname === '/' && userInfo.length > 0) {
      navigate('/partner/register');
    }
  }, [location.pathname, navigate, userInfo.length]);

  return (
    <>
      <Routeses>
        {routerConfig.map((r: any) => {
          const { component, needAuthor, grantPermision, ...rest } = r;
          const mode = isMobileAndTabletCheck() ? 'mobile' : 'desktop';
          const Component =
            r?.component?.[mode]?.page || r?.component?.[mode] || r?.component;
          const PublicLayout = isMobileAndTabletCheck()
            ? MobileLayout
            : DesktopLayout;
          const Layout =
            r?.component?.[mode]?.layout || r?.['layout'] || PublicLayout;
          const element = (
            <Layout mode={mode}>
              {((needAuthor && userInfo) || !needAuthor) && (
                <Component {...rest} mode={mode} />
              )}
              {/* {userInfo === null && <MyLoading />} */}
            </Layout>
          );
          return <Route key={r.path} exact {...rest} element={element}></Route>;
        })}
        <Route path='*' element={<NotFoundPage />} />
      </Routeses>
    </>
  );
};

export default Routes;

export function isAuthenticate() {
  return !!Cookie.get(constants.TOKEN);
}
