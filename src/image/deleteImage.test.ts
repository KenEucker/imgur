import { ImgurClient } from '../client';
import { deleteImage } from './deleteImage';

test('delete works successfully', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await deleteImage(client, 'CEddrgP');
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
