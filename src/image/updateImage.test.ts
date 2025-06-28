import { ImgurClient } from '../client';
import { updateImage } from './updateImage';

test('update one image with all props', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await updateImage(client, {
    imageHash: 'abc123',
    title: 'new title',
    description: 'description',
  });
  expect(response).toMatchInlineSnapshot(`
    {
      "data": true,
      "headers": {
        "content-length": "41",
        "content-type": "application/json",
      },
      "status": 200,
      "success": true,
    }
  `);
});

test('update one image with title only', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await updateImage(client, {
    imageHash: 'abc123',
    title: 'new title',
  });
  expect(response).toMatchInlineSnapshot(`
    {
      "data": true,
      "headers": {
        "content-length": "41",
        "content-type": "application/json",
      },
      "status": 200,
      "success": true,
    }
  `);
});

test('update one image without title or description', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = updateImage(client, {
    imageHash: 'abc123',
  });
  await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Update requires a title and/or description]`
  );
});
