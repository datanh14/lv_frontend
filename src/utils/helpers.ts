import { message } from "antd";
import Cookie from "js-cookie";
import CryptoJS from "crypto-js";
import DeviceDetector from "ua-parser-js";
import { notification } from "antd";

import * as constants from "../const/constant";

const has = Object.prototype.hasOwnProperty;

export const isDiff = (A?: any, B?: any) =>
  JSON.stringify(A) !== JSON.stringify(B);

export const isEmpty = (prop?: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, "length") && prop?.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const showErrorToast = (textMessage?: string) => {
  message.error(textMessage);
};

export const showErrorMessage = (codeError?: any) => {
  switch (codeError) {
    case 403008:
      showErrorToast("Tài khoản đăng nhập hoặc mật khẩu không chính xác !");
      break;
    default:
      showErrorToast("Đã có lỗi xảy ra, vui lòng thử lại sau !");
  }
};

export function isAuthenticate() {
  return !!Cookie.get(constants.TOKEN);
}

export const getDeviceInfo = (userAgent = "") => {
  if (!(typeof window === "undefined")) {
    const device = DeviceDetector(navigator.userAgent);
    if (device.device.type && device.device.type === "mobile") {
      return "Mobile-Web";
    } else {
      return "PC-Web";
    }
  } else {
    return "Server-web";
  }
};

export const getPlatform = (userAgent = "") => {
  if (!(typeof window === "undefined")) {
    const device = DeviceDetector(navigator.userAgent);
    if (device.device.type && device.device.type === "mobile") {
      return "mobile_web";
    } else {
      return "website";
    }
  } else {
    return "website";
  }
};

export const getAppHash = () => {
  let timeStamp = new Date().getTime();
  timeStamp = timeStamp / 1000 - ((timeStamp / 1000) % 300);
  let str = `${timeStamp}:${constants.CONFIG_SERVER.NEXT_PUBLIC_HASH_KEY}`;
  const hash = CryptoJS.SHA256(str);
  const hashStr = CryptoJS.enc.Base64.stringify(hash);
  return hashStr;
};

export const formatMoney = (
  amount = "0",
  decimalLength = 0,
  decimal = ",",
  thousands = "."
) => {
  try {
    let decimalCount = Math.abs(decimalLength);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = Number(amount) < 0 ? "-" : "";

    const i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(Number(amount) - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    throw e;
  }
};

export const isMobileAndTabletCheck = () => {
  let check = false;
  if (typeof navigator === "undefined") {
    return undefined;
  }
  const a = navigator.userAgent || navigator.vendor;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      a.substr(0, 4)
    )
  )
    check = true;
  return check;
};

export const isServer = () => typeof window === "undefined";

export const numberWithCommas = (x) => {
  if (x === "" || x === undefined || x === null) return "";
  return Math.round((x / 1000) * 1000)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const openNotificationWithIcon = (
  type: string,
  message: string,
  description: string,
  style?: any
) => {
  notification[type]({
    message: message,
    description: description,
    style:
      type === "error" ? constants.styleNotiError : constants.styleNotiSuccess,
  });
};
notification.config({
  placement: "topRight",
  duration: 2,
  maxCount: 1,
});
