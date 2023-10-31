import { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { ImgurApiResponse, Payload } from './types';

export function createForm(payload: string | Payload): FormData {
  const form = new FormData();

  if (typeof payload === 'string') {
    form.append('image', payload);
    return form;
  }

  for (const [key, value] of Object.entries(payload)) {
    const supportedUploadObjectTypes = ['base64', 'stream', 'file'];
    if (supportedUploadObjectTypes.indexOf(key) !== -1) {
      if (supportedUploadObjectTypes.indexOf(payload.type as string) !== -1) {
        form.append(key, payload);
      }
    } else if (value) {
      form.append(key, value);
    }
  }

  form.getHeaders = form.getHeaders
    ? form.getHeaders
    : () => {
        return {
          'Content-Type': 'multipart/form-data',
        };
      };

  return form;
}

export function getImgurApiResponseFromResponse(
  response: AxiosResponse
): ImgurApiResponse {
  let success = true;
  let data;
  let status = 200;
  const responseIsValid =
    response &&
    (typeof response.status !== 'undefined' ||
      typeof response.data?.status !== 'undefined') &&
    typeof response.data !== 'undefined';
  const responseIsSuccess = responseIsValid && !!response.data.success;
  const responseIsError =
    responseIsValid &&
    !responseIsSuccess &&
    (typeof response.data.data?.error !== 'undefined' ||
      typeof response.data.errors !== 'undefined');

  const getResponseData = (d) =>
    Array.isArray(d) ? d.map((t) => (responseIsError ? t.detail : t.data)) : d;

  if (typeof response === 'undefined') {
    data = 'response was empty';
    status = 500;
    success = false;
  } else if (typeof response === 'string') {
    data = response as string;
    status = 500;
    success = false;
  } else if (responseIsSuccess) {
    status = response.data.status;
    data = response.data.data.error
      ? response.data.data.error
      : response.data.data;
  } else {
    success = false;
    status =
      response.data.data?.error?.code ??
      response.status ??
      response.data.status;
    data = getResponseData(
      responseIsError
        ? response.data.errors ??
            response.data.data.error.message ??
            response.data.data.error
        : response.data.data ?? response.data.message ?? response.data
    );
  }

  return {
    data,
    status,
    success,
  };
}
