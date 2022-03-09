import { ReactComponent as CertificateIcon } from '../../../asset/icon/Certificate.svg';
import { ReactComponent as StatisticIcon } from '../../../asset/icon/statistic.svg';
import { ReactComponent as DolarIcon } from '../../../asset/icon/Dolar.svg';
import { ReactComponent as StatusDotIcon } from '../../../asset/icon/Status-dot.svg';
import { routesPath } from '../../../const/routerPath';

export const menuData = [
  {
    title: 'Quản lý tài khoản đối tác',
    icon: <CertificateIcon />,
    children: [
      {
        title: 'Tài khoản đăng ký',
        icon: <StatusDotIcon />,
        url: routesPath.partnerRegister,
      },
      {
        title: 'Đối tác hiện tại',
        icon: <StatusDotIcon />,
        url: '',
      },
    ],
  },
  {
    title: 'Quản lý hoa hồng',
    icon: <DolarIcon />,
    url: '',
  },
 
].map((item) => {
  const { children } = item;
  const keys = children?.map((i) => i?.url);
  return { ...item, keys };
});

export const activeMenus = {
  '/partner/active/detail': {
    icon: <CertificateIcon />,
    title: 'Chi tiết đối tác',
  },
};
menuData.forEach((item) => {
  const { icon, children, title, url = '' } = item;
  if (children) {
    children.forEach((i) => {
      const { title, url = '' } = i;
      activeMenus[url] = {
        icon,
        title,
      };
    });
  } else {
    activeMenus[url] = {
      icon,
      title,
    };
  }
});