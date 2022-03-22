// import { some } from '@components/constants';
import { api, EnhanceAxiosRequestConfig } from '../../../utils/api';
import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import DeviceDetector from 'ua-parser-js';
import CryptoJS from 'crypto-js';
type some = any;

const getPlatform = () => {
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

const getAppHash = () => {
  let timeStamp = new Date().getTime();
  timeStamp = timeStamp / 1000 - ((timeStamp / 1000) % 300);
  let str = `${timeStamp}:${
    getPlatform() === 'website'
      ? isDev()
        ? '95b9699c-25e5-4811-bb7e-5d9163bd2dd8'
        : process.env.NEXT_PUBLIC_HASH_KEY
      : isDev()
      ? '95b9699c-25e5-4811-bb7e-5d9163bd2dd8'
      : process.env.NEXT_PUBLIC_HASH_KEY_MOBILE
  }`;
  const hash = CryptoJS.SHA256(str);
  const hashStr = CryptoJS.enc.Base64.stringify(hash);
  return hashStr;
};

export const isServer = () => typeof window === 'undefined';
export const isDev = () =>
  process.env.NODE_ENV === 'development' ||
  (!isServer() &&
    (window.location.hostname.includes('-dev') ||
      window.location.hostname.includes('localhost')));
export const baseURL = () =>
  isDev() ? 'http://34.134.19.48/' : 'http://34.134.19.48/';

const devConfig = {
  APP_ID: 'mytour_web',
  VERSION: '1.0',
  UPLOAD_URL: 'https://assets.dev.tripi.vn',
  LOGIN_BASE_URL: 'https://dev-api.tripi.vn',
  BASE_URL: 'https://gate.dev.tripi.vn',
  APP_KEY: '95b9699c-25e5-4811-bb7e-5d9163bd2dd8',
};

const productConfig = {
  APP_ID: 'istore-web',
  VERSION: '1.0',
  UPLOAD_URL: 'https://assets.tripi.vn',
  LOGIN_BASE_URL: 'https://hotelapi.tripi.vn',
  BASE_URL: 'https://gate.tripi.vn',
  APP_KEY: 'dccd06f9-226b-4aca-9837-19707a58bfde',
};

const getConfig = () =>
  process.env.NODE_ENV === 'development' ? devConfig : productConfig;
const getBaseOption = (newOption?: any) => {
  const configs = getConfig();
  const timestamp = new Date().getTime();
  const timestampCS = timestamp / 1000 - ((timestamp / 1000) % 300);
  const appHash = Base64.stringify(sha256(`${timestampCS}:${configs.APP_KEY}`));
  // console.log('appID', configs.APP_ID);

  return {
    ...newOption,
    headers: {
      ...newOption?.headers,
    },
    readonlyOption: true,
  };
};

export const actionLogin = (data: some) => {
  const option = {
    baseURL: baseURL(),
    data,
    notifyError: true,
  };
  return api.post('/auth/login', getBaseOption(option));
};

export const requestOTP = (params: some) => {
  const option = {
    params,
    noAuthentication: true,
    headers: { config: 'MYTOUR' },
    severVice: 'AUTH_SERVICE',
    baseURL: baseURL(),
    notifyError: true,
    data: params,
  };
  const service = isDev() ? api.post : api.get;
  return api.get(
    isDev()
      ? '/ams/account/v2/send-signup-otp'
      : '/ams/account/v2/send-signup-otp',
    getBaseOption(option)
  );
};
export const signupV2 = (data: some) => {
  const option = {
    noAuthentication: true,
    headers: { config: 'MYTOUR' },
    severVice: 'AUTH_SERVICE',
    baseURL: baseURL(),
    notifyError: true,
    data,
  };
  const service = isDev() ? api.post : api.get;
  return api.post('ams/account/v2/signup-otp', getBaseOption(option));
};

export const forgetPasswordV2 = (data: some) => {
  const option = {
    baseURL: baseURL(),
    data: {
      ...data,
      configCode: 'MYTOUR',
    },
    notifyError: true,
  };
  return api.post('/ams/account/forget-password/v2', getBaseOption(option));
};
/**
 * submit change password
 * @param data
 * @returns
 */
export const changePassword = (data: some) => {
  const option = {
    baseURL: baseURL(),
    data: {
      ...data,
    },
    notifyError: true,
  };
  return api.post('/ams/account/otp-set-password', getBaseOption(option));
};
/**
 * get my information from mytour service
 * @param config
 * @returns
 */
export const getMytourUserInformation = (
  config?: EnhanceAxiosRequestConfig<any>
) => {
  const option = {
    severVice: 'AUTH_SERVICE',
    baseURL: baseURL(),
    // notifyError: true,
    ...config,
  };
  return api.get('/ams/account/simple-info', getBaseOption(option));
};

export const validateMytourAccessToken = (
  config?: EnhanceAxiosRequestConfig<any>
) => {
  const option = {
    baseURL: baseURL(),
    notifyError: false,
    platform: getPlatform(),
    version: '1.0',
    readonlyOption: true,
    ...config,
    headers: {
      appId:
        (getPlatform() === 'website'
          ? isDev()
            ? 'mytour_web'
            : process.env.NEXT_PUBLIC_APP_ID
          : isDev()
          ? 'mytour_mobi_web'
          : process.env.NEXT_PUBLIC_APP_ID_MOBILE) || '',
      appHash: getAppHash(),
      ...config?.headers,
    },
  };
  return api.get('/account/validateAccessToken', option);
};
