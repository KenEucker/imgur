import { HttpResponse } from 'msw';

const AuthenticationRequiredResponse = {
  data: {
    error: 'Authentication required',
    request: '/3/credits',
    method: 'GET',
  },
  success: false,
  status: 401,
};

const SuccessResponse = {
  data: {
    UserLimit: 500,
    UserRemaining: 500,
    UserReset: 1615614380,
    ClientLimit: 12500,
    ClientRemaining: 12500,
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
