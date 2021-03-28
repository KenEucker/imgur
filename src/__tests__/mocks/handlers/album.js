const AuthenticationRequiredResponse = {
  data: {
    error: 'Authentication required',
    request: '/3/album',
    method: 'POST',
  },
  success: false,
  status: 401,
};

const SuccessResponse = {
  data: {
    id: 'ybqNtEF',
    deletehash: 'KCsF6XvjfqpImI8',
  },
  success: true,
  status: 200,
};

export function postHandler(req, res, ctx) {
  if (!req.headers.has('authorization')) {
    return res(ctx.status(401), ctx.json(AuthenticationRequiredResponse));
  }

  return res(ctx.json(SuccessResponse));
}