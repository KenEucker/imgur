import { ImgurClient } from '../client';
import { favoriteImage } from './favoriteImage';
import { test, expect } from 'vitest';

test('favorite works successfully', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await favoriteImage(client, 'CEddrgP');
  expect(response).toMatchInlineSnapshot(`
    {
      "data": "favorited",
      "headers": {
        "content-length": "48",
        "content-type": "application/json",
      },
      "status": 200,
      "success": true,
    }
  `);
});
