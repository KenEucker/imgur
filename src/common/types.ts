export interface AccessToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface RapidApiKey {
  rapidApiHost?: string;
  rapidApiKey?: string;
}

export interface ClientId {
  clientId?: string;
  clientSecret?: string;
}

export interface Credentials extends AccessToken, ClientId, RapidApiKey {}

export interface ImgurTokenResponse {
  account_username?: string;
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
}

export function isAccessToken(arg: unknown): arg is AccessToken {
  return (arg as AccessToken).accessToken !== undefined;
}

export function isRefreshToken(arg: unknown): arg is AccessToken {
  return (arg as AccessToken).refreshToken !== undefined;
}

export function isClientId(arg: unknown): arg is ClientId {
  return (arg as ClientId).clientId !== undefined;
}

interface CommonData {
  id: string;
  title: string | null;
  description: string | null;
  datetime: number;
  link: string;

  ad_config?: {
    safeFlags: string[];
    highRiskFlags: string[];
    unsafeFlags: string[];
    wallUnsafeFlags: string[];
    showsAds: boolean;
  };
  ad_type: number;
  ad_url: string;

  account_url: string | null;
  account_id: string | null;
  favorite: boolean;
  is_ad: boolean;
  is_album: boolean;
  in_gallery: boolean;
  in_most_viral: boolean;
  nsfw: boolean | null;
  section: string | null;
  tags: Array<{
    name: string;
    display_name: string;
    followers: number;
    total_items: number;
    following: boolean;
    is_whitelisted: boolean;
    background_hash: string;
    thumbnail_hash: string | null;
    accent: string;
    background_is_animated: boolean;
    thumbnail_is_animated: boolean;
    is_promoted: boolean;
    description: string;
    logo_hash: string | null;
    logo_destination_url: string | null;
    description_annotations: Record<string, unknown>;
  }>;
  topic: string | null;
  topic_id: string | null;
  vote: null;

  comment_count: number | null;
  favorite_count: number | null;
  ups: number | null;
  downs: number | null;
  score: number | null;
  points: number | null;
  views: number;
}
export interface ImageData extends CommonData {
  type: string;
  width: number;
  height: number;
  size: number;
  deletehash?: string;
  bandwidth: number;
  animated: boolean;
  has_sound: boolean;
  edited: string;
  mp4_size?: number;
  mp4?: string;
  gifv?: string;
  hls?: string;
  looping?: boolean;
  processing?: {
    status: 'pending' | 'completed';
  };
}

export interface AlbumData extends CommonData {
  cover: string | null;
  cover_width: number | null;
  cover_height: number | null;
  layout: string;
  privacy: string;
  include_album_ads: boolean;
  images: ImageData[];
  images_count: number;
  deletehash: string;
}

export interface AccountData {
  id: number;
  url: string;
  bio: string;
  avatar: string;
  reputation: number;
  reputation_name: string;
  created: number;
  pro_expiration: boolean;
  user_follow: {
    status: boolean;
  };
}

export type GalleryData = Array<ImageData | AlbumData>;
export interface Payload {
  image?: string | Buffer | ReadableStream;
  type?: 'stream' | 'url' | 'base64';
  name?: string;
  title?: string;
  description?: string;
  album?: string;
  disable_audio?: '1' | '0';
}
export interface ImgurApiResponse<
  T =
    | Record<string, unknown>
    | Record<string, unknown>[]
    | string
    | string[]
    | boolean
    | ImageData
    | GalleryData
    | AlbumData
    | AccountData,
> {
  headers: Record<string, string>;
  data: T;
  status: number;
  success: boolean;
}
