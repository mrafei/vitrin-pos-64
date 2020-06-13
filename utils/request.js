import Axios from 'axios';
Axios.defaults.headers.common.Authorization = `Token 7ed230dc0749ff7f341e306894faa576c72853790740ff57ac46a099873dd82b`;

export default async function request(
  url,
  data,
  method = 'GET',
  headers,
  config = null,
) {
  let params = {
    url,
    method,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    ...config,
  };
  if (headers) {
    params = {
      ...params,
      headers,
    };
  }
  let response = null;
  let status = null;
  await Axios(params)
    .then(res => {
      response = res.data;
      status = res.data.meta.status_code;
    })
    .catch(e => {
      status = e;
      return e;
    });
  return { response, status };
}
