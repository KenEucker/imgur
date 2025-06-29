import { http } from 'msw';

import * as upload from './upload';
import * as authorize from './authorize';
import * as image from './image';
import * as gallery from './gallery';
import * as credits from './credits';
import * as albums from './albums';
import * as album from './album';
import * as account from './account';

export const handlers = [
  // authorize
  http.get('https://api.imgur.com/oauth2/authorize', authorize.getHandler),
  http.post('https://api.imgur.com/oauth2/authorize', authorize.postHandler),

  // album
  http.get('https://api.imgur.com/3/album/:id', album.getHandler),

  // upload
  http.post('https://api.imgur.com/3/upload', upload.postHandler),

  // gallery
  http.get('https://api.imgur.com/3/gallery/*', gallery.getHandler),

  // image
  http.get('https://api.imgur.com/3/image/:id', image.getHandler),
  http.post('https://api.imgur.com/3/image/:id', image.postHandler),
  http.post(
    'https://api.imgur.com/3/image/:id/favorite',
    image.postFavoriteHandler
  ),
  http.delete('https://api.imgur.com/3/image/:id', image.deleteHandler),

  // credits
  http.get('https://api.imgur.com/3/credits', credits.getHandler),

  // account
  http.get('https://api.imgur.com/3/account/:username', account.getHandler),
  http.get('https://api.imgur.com/3/account/albums/:page', albums.getHandler),
];
