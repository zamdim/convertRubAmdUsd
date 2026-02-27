import { saveAs } from 'file-saver';

const myLocation: string = import.meta.env.VITE_REACT_APP_API_URL;

const buildParamsPostNew = (met: string, data: any) => ({
  method: met,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'ru-RU',
  },
  body: JSON.stringify(data),
});

const buildParamsPost = (met: string, data?: any) => {
  if (data) {
    return {
      method: met,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ru-RU',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: met,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ru-RU',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
  };
};

const buildParamsPostFile = (met: string, file: FormData) => {
  return {
    method: met,
    body: file,
    headers: {},
  };
};

const buildParamsImagePost = (met: string, data?: any) => {
  return {
    method: met,
    headers: {},
    body: data,
  };
};

const buildParams = (met: string) => ({
  method: met,
  headers: {
    'Accept-Language': 'ru-RU',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  },
});

const handleResponse = async (res: any) => {
  const status = String(res.status).substring(0, 1);
  if (status === '2') {
    try {
      return (await res.json()) as Promise<any>;
    } catch (e) {
      try {
        const text = await res.text();
        return {
          text,
        };
      } catch (r) {
        return {};
      }
    }
  } else {
    return Promise.reject(res);
  }
};

const handleResponseJson = async (res: any) => {
  const status = String(res.status).substring(0, 1);
  if (status === '2') {
    try {
      return (await res.text()) as Promise<any>;
    } catch (e) {
      console.log(e?.message);
    }
  } else {
    return Promise.reject(res);
  }
};

const handleError = async (res: any) => {
  console.log(res);
  throw (await res.json()) as Promise<any>;
};

const handleErrorJson = async (res: any) => {
  console.log(res);
  throw (await res) as Promise<any>;
};

export async function downloadPDFFile(response: any) {
  const filename = response.headers.get('PDFFileName');
  saveAs(await response.blob(), filename);
}

export const postNew = (url: string, data: any) =>
  fetch(myLocation + url, buildParamsPostNew('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const postIm = (url: string, data?: any) =>
  fetch(myLocation + url, buildParamsImagePost('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const post = (url: string, data?: any) =>
  fetch(myLocation + url, buildParamsPost('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const patch = (url: string, data?: any) =>
  fetch(myLocation + url, buildParamsPost('PATCH', data))
    .then(handleResponse)
    .catch(handleError);
export const postToken = (url: string, data?: any) =>
  fetch(myLocation + url, buildParamsPost('POST', data))
    .then((res) => handleResponse(res))
    .catch(handleError);
export const get = (url: string) =>
  fetch(url, buildParamsPost('GET')).then(handleResponse).catch(handleError);
export const getJson = (url: string) =>
  fetch(url, buildParamsPost('GET'))
    .then(handleResponseJson)
    .catch(handleErrorJson);
export const put = (url: string) =>
  fetch(myLocation + url, buildParams('PUT'))
    .then(handleResponse)
    .catch(handleError);
export const putData = (url: string, data: any) =>
  fetch(myLocation + url, buildParamsPost('PUT', data))
    .then(handleResponse)
    .catch(handleError);
export const del = (url: string) =>
  fetch(myLocation + url, buildParams('DELETE'))
    .then(handleResponse)
    .catch(handleError);

export const downloadPost = (url: string, data: any) =>
  fetch(myLocation + url, buildParamsPost('POST', data))
    .then(downloadPDFFile)
    .catch(handleError);
export const postFile = (url: string, file: FormData) =>
  fetch(myLocation + url, buildParamsPostFile('POST', file))
    .then(handleResponse)
    .catch(handleError);
