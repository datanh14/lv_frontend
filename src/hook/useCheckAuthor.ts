// import {
//   getMyInformation,
//   joinReferralProgram,
// } from '@src/services/user.service';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TokenKeyName } from '../const/constant';
import { validateMytourAccessToken } from '../modules/authorization/Login/LoginService';
import { setUserInforAction } from '../modules/redux/actions/userAction';
import { EnhanceAxiosPromise } from '../utils/api';
const queryString = require('query-string');

interface Props {
  executeInEffect?: boolean;
}

function useCheckAuthor(props?: Props) {
  const { executeInEffect = true } = props || {};
  const dispatch = useDispatch();

  //?------- get use infor from redux store -------//
  // const userInforObj: any = useMemo(() => ({}), []);
  // useSelector(
  //   (state: { user: userState }) => state.user.userInfor
  // );

  //?----------- Get logon user information ---------------//
  const getMyInfor = useCallback(() => {
    const req = validateMytourAccessToken({
      headers: {
        login_token: localStorage.getItem(TokenKeyName) + '',
      },
    });
    const exe = async () => {
      try {
        // console.log('joinReferralProgram', dataResponse?.data?.data);
        const mytourUserInfor = await req;
        console.log('mytourUserInfor', mytourUserInfor);

        if (mytourUserInfor?.data?.code === 200) {
          // console.log('mytourUserInfor?.data?', mytourUserInfor?.data?.data);
          dispatch(setUserInforAction(mytourUserInfor?.data?.data));
        } else {
          // localStorage.setItem('token-key', '');
          if (mytourUserInfor?.data?.code === 401)
            localStorage.setItem(TokenKeyName, '');
          dispatch(setUserInforAction(undefined));
        }
      } catch (error) {
        localStorage.setItem(TokenKeyName, '');
        dispatch(setUserInforAction(undefined));
      }
    };
    exe();
    return req;
  }, [dispatch]);

  //?--------- get token from url and check with local storage ------//
  const isCheckTokenMobile = useRef(false);

  useEffect(() => {
    if (!executeInEffect) {
      return;
    }
    const query = queryString.parse(window.location.search);
    const queryToken: string = (query?.token || '') as string;
    const localToken = localStorage.getItem(TokenKeyName) || '';
    let token: string = queryToken || localToken;

    // if (
    //   query?.platform === 'mobile' &&
    //   !queryToken &&
    //   !isCheckTokenMobile.current
    // ) {
    //   isCheckTokenMobile.current = true;
    //   token = '';
    // }
    localStorage.setItem(TokenKeyName, token);

    //? clear token on server after read token query

    let req: EnhanceAxiosPromise<any>;

    if (token) {
      // if (!userInforObj)
      req = getMyInfor();
      console.log('request info');
    } else {
      dispatch(setUserInforAction(undefined));
    }
    return () => {
      if (req && req.isCancelable()) {
        req.cancel();
      }
    };
  }, [dispatch, executeInEffect, getMyInfor]);

  //?----------- check logout when token is removed from other tab -------------//
  const onHandlePageVisibility = useCallback(() => {
    if (!localStorage.getItem(TokenKeyName)) {
      localStorage.setItem(TokenKeyName, '');
      dispatch(setUserInforAction(undefined));
    } else {
      getMyInfor();
    }
  }, [dispatch, getMyInfor]);

  useEffect(() => {
    if (!executeInEffect) {
      return;
    }
    window.addEventListener('focus', onHandlePageVisibility);
    return () => {
      window.removeEventListener('focus', onHandlePageVisibility);
    };
  }, [executeInEffect, onHandlePageVisibility]);

  return { getMyInfor };
}

export default useCheckAuthor;
