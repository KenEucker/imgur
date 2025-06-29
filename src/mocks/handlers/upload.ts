import { HttpResponse } from 'msw';

const BadRequestErrorResponse = {
  status: 400,
  success: false,
  data: {
    error: 'Bad Request',
    request: '/3/upload',
    method: 'POST',
  },
};

type CreateResponseOptions = {
  id?: string;
  type?: string | null;
  title?: string | null;
  description?: string | null;
};

function createResponse({
  id = 'JK9ybyj',
  type = null,
  title = null,
  description = null,
}: CreateResponseOptions) {
  return {
    data: {
      id,
      deletehash: Array.from(id).reverse().join(''),
      title,
      description,
      link: `https://i.imgur.com/${id}.${type === 'video' ? 'mp4' : 'jpg'}`,
    },
    success: true,
    status: 200,
  };
}

export const postHandler = async (request) => {
  const formData = await request.formData();

  const image = formData.get('image')?.valueOf() ?? null;
  const stream = formData.get('stream')?.valueOf() ?? null;
  const base64 = formData.get('base64')?.valueOf() ?? null;
  const type = formData.get('type')?.valueOf() ?? null;
  const title = formData.get('title')?.valueOf() ?? null;
  const description = formData.get('description')?.valueOf() ?? null;

  if (image === null && stream === null && base64 === null) {
    return HttpResponse.json(BadRequestErrorResponse, { status: 400 });
  }

  if (type !== null && !['stream', 'url', 'base64'].includes(type as string)) {
    return HttpResponse.json(BadRequestErrorResponse, { status: 400 });
  }

  return HttpResponse.json(
    createResponse({
      title: title as string,
      description: description as string,
    }),
    { status: 200 }
  );
};
