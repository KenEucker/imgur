import { HttpResponse } from 'msw';

const AuthenticationRequiredResponse = {
  data: {
    error: 'Authentication required',
    request: '/3/account',
    method: 'POST',
  },
  success: false,
  status: 401,
};

const SuccessResponse = {
  data: {
    id: 'XtMnA',
    title: 'Meme album',
    description: 'Dank memes',
    image_count: 22,
    images: [
      {
        id: '2dAns',
        title: null,
        description: null,
        datetime: 1316635799,
        type: 'image/gif',
        link: 'https://i.imgur.com/2dAns.gif',
      },
      {
        id: 'snAd2',
        title: null,
        description: null,
        datetime: 1316635800,
        type: 'image/jpeg',
        link: 'https://i.imgur.com/2dAns.jpg',
      },
    ],
  },
  success: true,
  status: 200,
};

export const getHandler = (request) => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return HttpResponse.json(AuthenticationRequiredResponse, { status: 401 });
  }

  return HttpResponse.json(SuccessResponse, { status: 200 });
};
