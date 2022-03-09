export const JWT = "JWT";
// export const BASE_URL = "https://api.tiki.vn";
export const BASE_URL = "http://103.237.145.125:8090/";
export const EXPIRED = "EXPIRED";
export const VERSION_HOTEL_SERVICE = "1.0";
export const EXPIRED_TIME = 30 * 60 * 1000;
export const TOKEN = "token";
export const REFRESH_TOKEN = "refresh_token";
export const EXPIRED_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000;
export const LAST_LOGIN = "lastLogin";
export const USER_ROLES = "USER_ROLES";
export const AFF_SERVICE = "AFF_SERVICE";
export const AFF_ASSES_UPLOAD = "AFF_ASSES_UPLOAD";
export const Roles = {
  ROLE_USER: "ROLE_USER",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_MANAGER: "ROLE_MANAGER",
};

let env = process.env.BUILD_MODE || "local"; // local, dev, stg
console.log("BUILD_MODE=", env);

// ENV Local
export let CONFIG_SERVER = {
  NEXT_PUBLIC_DOMAIN_GATE: "http://35.222.124.243:8080",
  NEXT_PUBLIC_DOMAIN_BACKEND_CORE: "https://dev-api.tripi.vn",
  NEXT_PUBLIC_DOMAIN_BACKEND_CORE_ASSES_UPLOAD: "https://assets.tripi.vn",
  NEXT_PUBLIC_HASH_KEY: "91%qc2!Nbd%840nFRZ0#5Y^8oevm#sHc",
  NEXT_PUBLIC_APP_ID: "afwsax2y0smfv9wgg43kcabc9r9ksk1j",
};

// ENV DEV
if (env === "dev") {
  CONFIG_SERVER.NEXT_PUBLIC_DOMAIN_GATE = "http://35.222.124.243:8080";
  CONFIG_SERVER.NEXT_PUBLIC_DOMAIN_BACKEND_CORE = "https://dev-api.tripi.vn";
  CONFIG_SERVER.NEXT_PUBLIC_HASH_KEY = "91%qc2!Nbd%840nFRZ0#5Y^8oevm#sHc";
  CONFIG_SERVER.NEXT_PUBLIC_APP_ID = "afwsax2y0smfv9wgg43kcabc9r9ksk1j";
} else if (env === "prod") {
  // ENV PROD
  CONFIG_SERVER.NEXT_PUBLIC_DOMAIN_GATE = "http://35.222.124.243:8080";
  CONFIG_SERVER.NEXT_PUBLIC_DOMAIN_BACKEND_CORE =
    "https://flightapi.tripi.vn/v3";
  CONFIG_SERVER.NEXT_PUBLIC_HASH_KEY = "@Zz8qt5CzUlyg#$RK4YJmW5!I@yYSaVf";
  CONFIG_SERVER.NEXT_PUBLIC_APP_ID = "mytour-web";
}

// routes
export const routes = {
  ERROR: "/error",
  LOGOUT: "/logout",
  DEVICE_MANAGEMENT: "/device-management",
  ENROLL_DEVICE: "/enroll-device",
  ENROLL_DEVICE_ID: "/enroll-device/:deviceId?",
  EDIT_DEVICE: "/edit-device",
  EDIT_DEVICE_ID: "/edit-device/:deviceId",
  PROFILE: "/profile",
  CHANGE_PASSWORD: "/change-password",
  FORGOT_PASSWORD: "/forgot-password",
  //////////////
  HOME: "/",
  TOOLS: "/tools",
  DASHBOARD: "/dashboard",
  DASHBOARD_TEXT_LINK: "/dashboard/text-link",
  DASHBOARD_BANNER: "/dashboard/banner",
  DASHBOARD_PROMOTION: "/dashboard/promotion",
  DASHBOARD_CO_BRANDING: "/dashboard/co-branding",
  INCOME_DETAIL: "/dashboard/thu-nhap",
  MY_ADS_TYPE: "/my_ads/:typeId",
  PERFORMANCE_TYPE: "/performance/:typeId",
  MY_ACCOUNT: "/my_account",
  HELP_TYPE: "/help/:typeId",
  CONTACT_US: "/contact_us",
  SIGNUP_AUTO: "/signup_auto",
  LOGIN: "/login",
  FORGOT: "/forgot",
  REGISTER: "/register",
};

export const routePage = {
  MY_ADS: {
    LIST_MY_ADS: "/my_ads/list",
    TOLLS_MY_ADS: "/my_ads/ad_tools",
    CO_BRAND_MY_ADS: "/my_ads/co_brand",
  },
  PERFORMANCE: {
    OVERVIEW_PERFORMANCE: "/performance/performance_overview",
    TICKET_LIST_PERFORMANCE: "/performance/ticket_list",
    TICKET_STATUS_LIST_PERFORMANCE: "/performance/ticket_status_list",
  },
  HELP: {
    FAQS_HELP: "/help/list",
    TERMS_CONDITIONS_HELP: "/help/terms_conditions",
    COMMISSION_HELP: "/help/commission_rates",
  },
};

export const DEVICE_STATUS = {
  ACTIVATED: "ACTIVATED",
  LOCKED: "LOCKED",
  NONE: "NONE",
  OPEN: "OPEN",
};

export const ROLES = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  VENDOR: [
    "ROLE_VENDOR_EVN",
    "ROLE_VENDOR_VIETNAMMOBILE",
    "ROLE_VENDOR_VIETTEL",
    "ROLE_VENDOR_BEELINEVN",
    "ROLE_VENDOR_SPHONE",
    "ROLE_VENDOR_VINAPHONE",
    "ROLE_VENDOR_MOBILEPHONE",
    "ROLE_VENDOR_EMOBILE",
  ],
};

export const socialAccount = {
  gg_plus_id:
    "701699179758-9tb2gjluvjnu2m218tka373fv62cq8rq.apps.googleusercontent.com",
  facebook_id: "857393964278669",
};

export const TokenKeyName = "token-affiliate-portal";
const commonStyle = {
  padding: 15,
  display: "flex",
  alignItems: "center",
};
export const styleNotiSuccess = {
  ...commonStyle,
  backgroundColor: "#edf8f1",
  color: "#48BB78",
};
export const styleNotiError = {
  ...commonStyle,
  backgroundColor: "#fff0f6",
  color: "#FF3366",
};
