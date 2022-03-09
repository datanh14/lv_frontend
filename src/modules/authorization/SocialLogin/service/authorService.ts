import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { baseURL } from '../../Login/LoginService';
import { api } from '../../../../utils/api';

const timestamp = new Date().getTime();
const timestampCS = timestamp / 1000 - ((timestamp / 1000) % 300);
const appHash = () =>
  Base64.stringify(
    sha256(`${timestampCS}:dccd06f9-226b-4aca-9837-19707a58bfde`)
  );
export const authorAccountViaFbGg = (data = {}) => {
  const option = {
    data,
    severVice: 'AUTH_SERVICE',
    baseURL: baseURL(),
    headers: {
      appId: 'istore-web',
      appHash: appHash(),
    },
    readonlyOption: true,
  };
  return api.post('/auth/oauth', option);
};
