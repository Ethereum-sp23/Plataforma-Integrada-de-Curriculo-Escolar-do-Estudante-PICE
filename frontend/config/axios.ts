import axiosPackage, { AxiosInstance } from "axios";

interface Axios extends AxiosInstance {
    CancelToken?: any;
    isCancel?: any;
}

const axios: Axios = axiosPackage.create({
    // withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    headers: {
        common: {
            Accept: "application/json",
        },
    },
});

// axios.CancelToken = axiosPackage.CancelToken;
// axios.isCancel = axiosPackage.isCancel;

export { axios };
