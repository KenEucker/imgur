import { EventEmitter } from 'events';
import { getAuthorizationHeader } from './getAuthorizationHeader';
import {
  deleteImage,
  favoriteImage,
  getImage,
  upload,
  updateImage,
  UpdateImagePayload,
} from './image';
import {
  GalleryOptions,
  getGallery,
  getSubredditGallery,
  SubredditGalleryOptions,
  searchGallery,
  SearchGalleryOptions,
} from './gallery';
import { getAlbum, createAlbum } from './album';
import { getAccount, getAlbums, getAlbumsIds } from './account';
import { IMGUR_API_PREFIX } from './common/endpoints';
import type {
  AccountData,
  AlbumData,
  Credentials,
  GalleryData,
  ImageData,
  ImgurApiResponse,
  Payload,
} from './common/types';

const USERAGENT = 'imgur (https://github.com/keneucker/imgur)';

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
export type { Credentials as ImgurCredentials, ImgurApiResponse };
export class ImgurClient extends EventEmitter {
  private plainFetcher: AxiosInstance;
  private fetcher: AxiosInstance;

  constructor(public credentials: Credentials) {
    super();

    this.credentials.rapidApiHost = credentials.rapidApiKey?.length
      ? credentials.rapidApiHost ?? 'imgur-apiv3.p.rapidapi.com'
      : credentials.rapidApiHost;
    const headers =
      typeof window !== 'undefined'
        ? {}
        : {
            'user-agent': USERAGENT,
          };

    this.plainFetcher = axios.create({
      baseURL: IMGUR_API_PREFIX,
      headers,
      responseType: 'json',
    });
    this.fetcher = axios.create({
      baseURL: credentials.rapidApiKey?.length
        ? `https://${this.credentials.rapidApiHost}`
        : IMGUR_API_PREFIX,
      headers,
      responseType: 'json',
    });
    this.fetcher.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers.authorization = await getAuthorizationHeader(this);

        if (credentials.rapidApiKey?.length) {
          config.headers['x-rapidapi-host'] = credentials.rapidApiHost;
          config.headers['x-rapidapi-key'] = credentials.rapidApiKey;
        }
        return config;
      },
      (e: Error) => Promise.reject(e)
    );
  }

  plainRequest(options: AxiosRequestConfig): Promise<AxiosResponse<unknown>> {
    return this.plainFetcher(options);
  }

  request(options: AxiosRequestConfig = {}): Promise<AxiosResponse<unknown>> {
    return this.fetcher(options);
  }

  deleteImage(imageHash: string): Promise<ImgurApiResponse<boolean>> {
    return deleteImage(this, imageHash);
  }

  favoriteImage(imageHash: string): Promise<ImgurApiResponse<string>> {
    return favoriteImage(this, imageHash);
  }

  getAlbum(albumHash: string): Promise<ImgurApiResponse<AlbumData>> {
    return getAlbum(this, albumHash);
  }

  getAccount(account: string): Promise<ImgurApiResponse<AccountData>> {
    return getAccount(this, account);
  }

  getAlbums(
    account: string,
    page?: number
  ): Promise<ImgurApiResponse<AlbumData[]>> {
    return getAlbums(this, account, page);
  }

  createAlbum(
    title?: string,
    description?: string
  ): Promise<ImgurApiResponse<AlbumData>> {
    return createAlbum(this, title, description);
  }

  getAlbumsIds(
    account: string,
    page?: number
  ): Promise<ImgurApiResponse<string[]>> {
    return getAlbumsIds(this, account, page);
  }

  getGallery(options: GalleryOptions): Promise<ImgurApiResponse<GalleryData>> {
    return getGallery(this, options);
  }

  getSubredditGallery(
    options: SubredditGalleryOptions
  ): Promise<ImgurApiResponse<GalleryData>> {
    return getSubredditGallery(this, options);
  }

  searchGallery(
    options: SearchGalleryOptions
  ): Promise<ImgurApiResponse<GalleryData>> {
    return searchGallery(this, options);
  }

  getImage(imageHash: string): Promise<ImgurApiResponse<ImageData>> {
    return getImage(this, imageHash);
  }

  updateImage(payload: UpdateImagePayload): Promise<ImgurApiResponse<boolean>> {
    return updateImage(this, payload);
  }

  upload(payload: Payload): Promise<ImgurApiResponse<ImageData>> {
    return upload(this, payload);
  }
}
