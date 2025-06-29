import { ImgurClient } from '../client';
import { getAlbum } from './getAlbum';
import { test, expect } from 'vitest'

test('returns an album response', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await getAlbum(client, 'XtMnA');
  expect(response).toMatchInlineSnapshot(`
    {
      "data": {
        "description": "Dank memes",
        "id": "XtMnA",
        "image_count": 22,
        "images": [
          {
            "datetime": 1316635799,
            "description": null,
            "id": "2dAns",
            "link": "https://i.imgur.com/2dAns.gif",
            "title": null,
            "type": "image/gif",
          },
          {
            "datetime": 1316635800,
            "description": null,
            "id": "snAd2",
            "link": "https://i.imgur.com/2dAns.jpg",
            "title": null,
            "type": "image/jpeg",
          },
        ],
        "title": "Meme album",
      },
      "headers": {
        "content-length": "382",
        "content-type": "application/json",
      },
      "status": 200,
      "success": true,
    }
  `);
});
