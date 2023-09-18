import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// getUri(config?: AxiosRequestConfig): string;
// request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
// get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
// delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
// head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
// options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
// post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
// put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
// patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;

class Services {
  axios: any;
  interceptors: null;

  constructor() {
    this.axios = axios;
    this.interceptors = null;
    this.axios.defaults.withCredentials = true;
  }

  saveLocalStorage(data: any) {
    const { token } = data;
    const dataSave = {
      token,
    };
    window.localStorage.setItem("user", JSON.stringify(dataSave));
  }

  clearLocalStorage() {
    window.localStorage.removeItem("user");
  }

  attachTokenToHeader(token: string) {
    this.interceptors = this.axios.interceptors.request.use(
      function (config: any) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
  }

  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  handleResponse(
    response: AxiosResponse,
    error: AxiosError,
    isSuccess: boolean
  ) {
    if (isSuccess) {
      return response;
    } else {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.reload();
        return;
      }
      return error.response;
    }
  }

  async get(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.get(url, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error :any) {
        console.log('error',error)
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.post(url, data, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error :any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.delete(url, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error :any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.axios.put(url, data, config);
      return this.handleResponse(response, {} as AxiosError, true);
    } catch (error :any) {
      return this.handleResponse({} as AxiosResponse, error, false);
    }
  }
}

export const HeaderUTF8Option = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-HTTP-Method-Override": "GET"
  },
};

export default new Services();
