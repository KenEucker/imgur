import { ImgurClient } from '../client';
import { getImage } from './getImage';
import { test, expect } from 'vitest';

test('returns an image response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await getImage(client, 'CEddrgP');
  expect(response).toMatchInlineSnapshot(`
    {
      "data": {
        "description": "image-description",
        "id": "CEddrgP",
        "title": "image-title",
      },
      "headers": {
        "content-length": "109",
        "content-type": "application/json",
      },
      "status": 200,
      "success": true,
    }
  `);
});
