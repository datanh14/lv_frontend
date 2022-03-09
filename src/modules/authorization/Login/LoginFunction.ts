// import { socialAccount } from '../SocialLogin/account';
// import { some } from '@components/constants';
import { EnhanceAxiosPromise } from '../../../utils/api';
import {
  actionLogin,
  changePassword,
  forgetPasswordV2,
  requestOTP,
  signupV2,
} from './LoginService';
// import { AxiosResponse } from 'axios';

export const HandleLogin = (account: string, password: string) => {
  let cancel = () => {};
  const promise: EnhanceAxiosPromise<any> = new Promise(async (resolve) => {
    let result: any;
    const req = actionLogin({
      account,
      password,
    });
    cancel = () => {
      if (req.isCancelable()) req.cancel();
    };
    try {
      const res: any = await req;

      if (res?.data?.code === 200) {
        console.log(res.data);
        result = {
          data: res?.data,
        };
      } else {
        result = {
          data: {
            error: {
              message: res?.data?.message,
            },
          },
        };
      }
    } catch (error) {
      result = { data: { error } };
    }
    resolve(result);
  }) as EnhanceAxiosPromise<any>;
  promise.cancel = cancel;
  return promise as EnhanceAxiosPromise<any>;
};

export const HandleOTP = async (phone: string) => {
  try {
    const res: any = await requestOTP({
      phone,
    });

    if (res?.data?.code === 200) {
      console.log('res', res);
      return {
        data: res?.data?.data,
      };
    } else {
      console.log('res error', res);
      return {
        error: {
          message: res?.data?.message,
        },
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
};

export const HandleRegister = async (props?: any) => {
  const { phone, password, rePassword, otp, name, email } = props || {};
  try {
    const res: any = await signupV2({
      phone,
      password,
      rePassword,
      otp,
      name,
      email,
    });

    if (res?.data?.code === 200) {
      return {
        data: res?.data?.data,
      };
    } else {
      return {
        error: {
          message: res?.data?.message,
        },
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
};

export const HandleForgetPassword = async ({ account }: { account?: any }) => {
  try {
    const res: any = await forgetPasswordV2({
      account,
    });

    if (res?.data?.code === 200) {
      return {
        data: res?.data?.data,
      };
    } else {
      return {
        error: {
          message: res?.data?.message,
        },
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
};
export const HandleResetNewPassword = async (data: any) => {
  try {
    const res: any = await changePassword(data);

    if (res?.data?.code === 200) {
      return {
        data: res?.data?.data,
      };
    } else {
      return {
        error: {
          message: res?.data?.message,
        },
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
};
