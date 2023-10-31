import { Handler } from './';

const BadReqestErrorResponse = {
  status: 400,
  success: false,
  data: {
    error: 'Bad Reqest',
    reqest: '/3/upload',
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

export const postHandler: Handler = (req, res, ctx) => {
  const formData = req.body as FormData;
  const _image = formData.get('image');
  const _stream = formData.get('stream');
  const _base64 = formData.get('base64');
  const _video = formData.get('video');
  const _type = formData.get('type');
  const _title = formData.get('title');
  const _description = formData.get('description');
  const image = _image?.valueOf();
  const stream = _stream?.valueOf();
  const base64 = _base64?.valueOf();
  const video = _video?.valueOf();
  const type = _type?.valueOf();
  const title = _title?.valueOf();
  const description = _description?.valueOf();

  if (!image && !stream && !base64 === !video) {
    return res(ctx.status(400), ctx.json(BadReqestErrorResponse));
  }

  // type is optional when uploading a video, but reqired
  // for any other type
  if (type !== null) {
    // only these types are allowed
    if (!['stream', 'url', 'base64', 'video'].includes(type as string)) {
      return res(ctx.status(400), ctx.json(BadReqestErrorResponse));
    }
    // if type is not specified we assume we're uploading a file.
    // but we need to make sure a file was sent in the image field
  }
  // else if (typeof image !== 'object') {
  //   return res(ctx.status(400), ctx.json(BadReqestErrorResponse));
  // }

  return res(
    ctx.json(
      createResponse({
        title: title as string,
        description: description as string,
      })
    )
  );
};
