import { AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";

export class HttpQueryService<T> {
    endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }  
    getAll = (requestConfig?: AxiosRequestConfig) => {
      const request = axiosInstance
        .get(`${this.endpoint}`, { ...requestConfig })
        .then((res) => res.data);
  
      return request;
    };  
    delete = (id: number) => {
      return axiosInstance.delete(`${this.endpoint}${id}/`);
    };
    create = (entity: T) => {
      return axiosInstance.post(this.endpoint, entity);
    };
    update = (entity: T, id: number) => {
      return axiosInstance.put(`${this.endpoint}${id}/`, entity);
    };
   
  }