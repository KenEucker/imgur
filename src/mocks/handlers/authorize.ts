import { HttpResponse } from 'msw';

const RequiredFieldErrorResponse = (method: string) => {
  return {
    data: {
      error: 'client_id and response_type are required',
      request: '/oauth/authorize',
      method,
    },
    success: false,
    status: 400,
  };
};

const UnauthorizedErrorResponse = {
  data: {
    error: 'Unauthorized',
    request: '/oauth2/authorize',
    method: 'POST',
  },
  success: false,
  status: 403,
};

function createRedirectUrl(username: string) {
  return `https://somedomain.com#access_token=123accesstoken456&expires_in=315360000&token_type=bearer&refresh_token=123refrestoken456&account_username=${username}&account_id=123456`;
}

export const postHandler = async (request) => {
  const url = new URL(request.url);
  const clientId = url.searchParams.get('client_id');
  const responseType = url.searchParams.get('response_type');

  if (!(clientId && responseType)) {
    return HttpResponse.json(RequiredFieldErrorResponse('POST'), {
      status: 400,
    });
  }

  const body = await request.json();
  const { username, password, allow } = body;

  if (!(username && password && allow)) {
    return HttpResponse.json(UnauthorizedErrorResponse, { status: 403 });
  }

  const redirectUrl = createRedirectUrl(username);

  return new HttpResponse(null, {
    status: 200,
    headers: {
      Location: redirectUrl,
      'Set-Cookie': `authorize_token=${allow}; Path=/oauth2; Domain=.api.imgur.com; Secure; HttpOnly`,
    },
  });
};

export const getHandler = (request) => {
  const url = new URL(request.url);
  const clientId = url.searchParams.get('client_id');
  const responseType = url.searchParams.get('response_type');

  if (!(clientId && responseType)) {
    return HttpResponse.json(RequiredFieldErrorResponse('GET'), {
      status: 400,
    });
  }

  const mockAuthorizeToken = 'abcxyz';
  const html = `
    <html>
      <form method="post" action="">
        <input type="text" name="username" id="username">
        <input type="password" name="password" id="password">
        <button type="submit" name="allow" value="${mockAuthorizeToken}"></button>
      </form>
    </html>
  `;

  return new HttpResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': `authorize_token=${mockAuthorizeToken}; Path=/oauth2; Domain=.api.imgur.com; Secure; HttpOnly`,
    },
  });
};
