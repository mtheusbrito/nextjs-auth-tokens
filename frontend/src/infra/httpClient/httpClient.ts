// Arquitetura exagonal
// Ports e Adapters
import axios, { AxiosRequestConfig } from 'axios';
type Response = {
  data: any,
  ok: boolean
}
export const HttpClient = async (
  options: AxiosRequestConfig,
) :Promise<Response> => {
  
  const { data , status } = await axios({url: options.url, method: options.method, headers:{
    ...options.headers,
    'Content-Type': 'application/json'},
    data: options.data
  });
  return {
    data: data.data,
    ok: status === 200 || status === 201
  }
};
