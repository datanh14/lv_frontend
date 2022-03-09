import { some } from "../../../../const/keyString";
import { actionLogin } from "../../../../modules/authorization/Login/LoginService";
import { api, EnhanceAxiosPromise } from "../../../../utils/api";

export const LoginFunction = (data?: any) => {
    return api.post("/auth/login", {
        data: { ...data },
    });
};
