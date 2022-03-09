// import * as React from 'react';
import DesktopHomePage from '../../components/desktop/DesktopHomePage/DesktopHomePage';
import DesktopPartnerRegister from '../../components/desktop/DesktopPartnerRegister/DesktopPartnerRegister';
import DesktopLayout from '../../components/Layout/Desktop/DesktopLayout/DesktopLayout';
import { RouterInterface } from '../../const/interface';
import { routesPath } from '../../const/routerPath';

const SimpleLayout = (props: any) => {
  return props.children;
};
export const routerConfig: Array<RouterInterface> = [
  {
    path: routesPath.HOME,

    component: DesktopHomePage,
    layout: SimpleLayout,
    needAuthor: false,
    grantPermision: [],
  },
  {
    path: routesPath.partnerRegister,
    component: DesktopPartnerRegister,
    layout: DesktopLayout,
    needAuthor: true,
    grantPermision: [],
  },
];
