import { EnhanceAxiosResponse } from './api';
declare global {
  interface Window {
    showNotify: any;
  }
}
export const checkApiResponse = (props?: any) => {
  const { response, resolve, reject, notifyError } = props;
  response.isSuccess = false;
  if (
    notifyError &&
    response?.data?.code !== 200 &&
    response?.data?.data?.code !== 200 &&
    typeof window?.showNotify !== 'undefined'
  ) {
    window?.showNotify(response?.data?.message, { variant: 'error' });
  } else {
    response.isSuccess = true;
  }

  resolve(response as EnhanceAxiosResponse<any>);
};
export const handlerApiReject = (reject?: any, error?: any) => {
  reject(error);
};
