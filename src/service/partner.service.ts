import { api } from '../utils/api';

export const getPartnerList = (data?: any) => {
  const { current = 0, pageSize = 10 } = data || {};
  return api.post('/aff/admin/get-partner-list', {
    data: { ...data, pageSize, pageNum: current },
  });
};

export const getRegisterPartnerList = (data?: any) => {
  const { current = 0, pageSize = 10 } = data || {};
  return api.post('/examinees/search', {
    data: { ...data, pageSize, pageNumb: current },
  });
};
export const getMajor = () => {
  return api.get('/general/majors', {});
};

const getBaseOption = (newOption) => {
  return {
    ...newOption,
    headers: {
      ...newOption?.headers,
    },
  };
};
export const importFile = (data) => {
  return api.post('/examinees/import', {
    data,
  });
};
export const getProvince = () => {
  return api.get('/general/provinces', {});
};
export const getRegions = () => {
  return api.get('/general/regions', {});
};
export const getRaces = () => {
  return api.get('/general/races', {});
};
export const getPriorities = () => {
  return api.get('/general/priorities', {});
};
export const actionCreatePerson = (data?: any) => {
  return api.post('/examinees', {
    data: { ...data },
  });
};
export const getPartnerDetail = (id) => {
  return api.get('/aff/admin/get-partner-detail', {
    params: {
      affiliationInfoId: id,
    },
  });
};

export const getCommissionStatistic = (data) => {
  return api.post('/aff/get-commission-statistic', {
    data,
  });
};
export const getGMVStatistic = (data) => {
  return api.post('/aff/get-gmv-statistic', {
    data,
  });
};
export const getApprovedAccount = (data) => {
  return api.post('/aff/admin/update-approval-request-status', {
    data,
  });
};
export const postUploadFile = (data) => {
  return api.post('/examinees/import', {
    data,
    headers: { 'content-type': 'multipart/form-data' },
  });
};
