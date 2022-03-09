import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './SocialLogin.scss';
import { socialAccount } from './account';
// import { useDispatch } from 'react-redux';
// import cookie from 'js-cookie';
import DeviceDetector from 'ua-parser-js';
import { ReactComponent as GoogleIcon } from './icons/icon_google.svg';
import { ReactComponent as FacebookIcon } from './icons/icon_facebook.svg';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { authorAccountViaFbGg } from './service/authorService';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface SocialLoginProps {
  /**
   * redirectUri redirect link after login facebook success
   */
  redirectUri?: string;
  /**
   * isRegister
   */
  isRegister?: boolean;
  /**
   * Success callback after logon via Facebook or Google
   */
  successCallback?: Function;
  /**
   * onChecking callback will receive a checking variable
   */
  onChecking?: Function;
  /**
   * facebookButton render login button for facebook
   */
  facebookButton?: any;
  /**
   * googleButtonrender login button for google
   */
  googleButton?: any;
  /**
   * diable facebook and google login buttons
   */
  disabled?: boolean;
  /**
   * hide facebook
   */
  hideFacebook?: boolean;
}
const btnStyle = {
  backgroundColor: 'white',
  border: '1px solid rgb(160, 174, 192)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 600,
  fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
  padding: '2px 16px 2px 10px',
  cursor: 'pointer',
  width: '100%',
  margin: '10px 0',
};

const getPlatform = (userAgent = '') => {
  if (!(typeof window === 'undefined')) {
    const device = DeviceDetector(navigator.userAgent);
    if (device.device.type && device.device.type === 'mobile') {
      return 'mobile_web';
    } else {
      return 'website';
    }
  } else {
    return 'website';
  }
};
const isMobileAndTabletCheck = () => {
  let check = false;
  if (typeof navigator === 'undefined') {
    return true;
  }
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
};

const disableStyle: CSSProperties | undefined = {
  pointerEvents: 'none',
  opacity: 0.7,
};

const SocialLogin: FunctionComponent<SocialLoginProps> = ({
  // redirectUri = 'http://localhost:3000',
  redirectUri = 'https://mytour.vn/',
  isRegister = false,
  successCallback,
  onChecking,
  facebookButton,
  googleButton,
  disabled,
  hideFacebook = false,
}) => {
  //?--------- hooks --------------//
  // const dispatch = useDispatch();
  // const router = useRouter();
  const navigate = useNavigate();
  //?--------- states ------------//
  const [LoadingButton, setLoadingButton] = useState(false);

  const requestAuthor = useRef<any>();

  /**
   * handle author -> get user infor from google and facebook token
   */
  const handleOauth = useCallback(
    async (dataViaFbGg = {}) => {
      console.log('handleOauth', dataViaFbGg);
      onChecking && onChecking({ checking: true });
      try {
        let deviceId = '';
        const key = `${
          getPlatform() === 'website'
            ? process.env.NEXT_PUBLIC_APP_ID
            : process.env.NEXT_PUBLIC_APP_ID_MOBILE
        }_v2021-05-03`;
        deviceId = `${new Date().valueOf()}-${Math.random()}`;
        const value = localStorage.getItem(key);
        if (value === null) {
          localStorage.setItem(key, deviceId);
        } else {
          deviceId = value;
        }
        const dataDTO = {
          ...dataViaFbGg,
          device_id: deviceId,
        };
        // dispatch({
        //   type: actionTypes.SET_VISIBLE_FETCHING,
        //   payload: true,
        // });
        setLoadingButton(true);
        requestAuthor.current = authorAccountViaFbGg(dataDTO);
        const { data } = await requestAuthor.current;
        // dispatch({
        //   type: actionTypes.SET_VISIBLE_FETCHING,
        //   payload: false,
        // });
        if (data.code === 200) {
          // localStorage.removeItem(LAST_BOOKING_HOTEL);
          // console.log('author-data', data);
          if (successCallback) successCallback(data);
          // cookie.set('token', data.data.loginToken, { expires: 180 });
          if (!isMobileAndTabletCheck()) {
            // router.reload();
          } else {
            // router.back();
            if (dataViaFbGg.provider === 'facebook') {
              // router.back();
              // navigate(-1);
            }
            // dispatch({
            //   type: actionTypes.SET_INFORMATION_USER,
            //   payload: data.data || {},
            // });
          }
          // data?.message &&
          //   enqueueSnackbar(
          //     isLogin
          //       ? listString.IDS_MT_TEXT_LOGIN_ACCOUNT_SUCCESS
          //       : listString.IDS_MT_TEXT_CREATE_ACCOUNT_SUCCESS,
          //     snackbarSetting((key) => closeSnackbar(key), {
          //       color: 'success',
          //     })
          //   );
        }
        // else {
        //   data?.message &&
        //     enqueueSnackbar(
        //       data?.message,
        //       snackbarSetting((key) => closeSnackbar(key), {
        //         color: 'error',
        //       })
        //     );
        // }
        setLoadingButton(false);
      } catch (error) {
        // dispatch({
        //   type: actionTypes.SET_VISIBLE_FETCHING,
        //   payload: false,
        // });
        setLoadingButton(false);
      }
      onChecking && onChecking({ checking: false });
    },
    [onChecking, successCallback]
  );
  /**
   * @param response handle response facebook
   */
  const responseFacebook = useCallback(
    async (response) => {
      if (
        response.status === 'unknown' ||
        response.status === 'not_authorized'
      ) {
      } else {
        const dataViaFbGg = {
          accessToken: response.accessToken || '',
          type: 'FACEBOOK',
        };
        handleOauth(dataViaFbGg);
      }
    },
    [handleOauth]
  );
  /**
   * handle response success for google login
   */
  const responseOnSuccessGoogle = useCallback(
    async (response) => {
      // console.log('response', response);

      const dataViaFbGg = {
        accessToken: response.tokenId || '',
        type: 'GOOGLE',
      };
      handleOauth(dataViaFbGg);
    },
    [handleOauth]
  );

  const responseOnFailureGoogle = useCallback((response) => {
    console.log('responseOnFailureGoogle', response);
  }, []);

  const FacebookButton = useCallback(
    (renderProps) => {
      return (
        <div
          style={{ ...(LoadingButton ? disableStyle : {}) }}
          onClick={renderProps.onClick}
        >
          {facebookButton || (
            <button style={btnStyle} disabled={LoadingButton}>
              <FacebookIcon />{' '}
              <span style={{ fontSize: 16, marginLeft: 20 }}>
                {isRegister
                  ? 'Đăng ký bằng Facebook'
                  : 'Đăng nhập bằng Facebook'}
              </span>
            </button>
          )}
        </div>
      );
    },
    [LoadingButton, facebookButton, isRegister]
  );
  const GoogleButton = useCallback(
    (renderProps) => {
      return (
        <div
          style={{ ...(LoadingButton ? disableStyle : {}), marginTop: 10 }}
          onClick={renderProps.onClick}
        >
          {googleButton || (
            <button style={btnStyle}>
              <GoogleIcon />{' '}
              <span style={{ fontSize: 16, marginLeft: 20 }}>
                {isRegister ? 'Đăng ký bằng Google' : 'Đăng nhập bằng Google'}
              </span>
            </button>
          )}
        </div>
      );
    },
    [LoadingButton, googleButton, isRegister]
  );

  //?----------------- effect ------------------
  useEffect(() => {
    return () => {
      if (requestAuthor?.current?.isCancelable()) {
        requestAuthor?.current?.cancel();
      }
    };
  }, []);

  return (
    <div
      className={clsx('social-login', {
        ['disabled']: disabled,
      })}
      style={{ minWidth: 280 }}
    >
      <>
        {!hideFacebook && (
          <FacebookLogin
            appId={socialAccount.facebook_id}
            callback={responseFacebook}
            fields='name,email,picture'
            redirectUri={redirectUri}
            render={FacebookButton}
          />
        )}
        <GoogleLogin
          clientId={socialAccount.gg_plus_id}
          buttonText='Login'
          onSuccess={responseOnSuccessGoogle}
          onFailure={responseOnFailureGoogle}
          cookiePolicy={'single_host_origin'}
          disabled={LoadingButton}
          render={GoogleButton}
        />
      </>
    </div>
  );
};

export default SocialLogin;
