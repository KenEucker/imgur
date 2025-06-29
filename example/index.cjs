const { ImgurClient, getAuthorizationHeader } = require('../');
const { createReadStream } = require('fs');
const { join } = require('path');
require('dotenv').config();

const album = process.env.ALBUM;
const imgur = new ImgurClient({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  rapidApiKey: process.env.RAPID_API_KEY,
});

const run = async (client) => {

  await getAuthorizationHeader(client).then(console.log)
  console.log(client.credentials)

  const imageStream = createReadStream(join(__dirname, 'small.jpg'));
  const videoStream = createReadStream(join(__dirname, 'small.mp4'));

  await client.createAlbum('test').then(console.log)

  // await client.upload({ album, image: imageStream, type: 'stream' }).then(console.log);
  // await client.upload({ album, image: videoStream, type: 'stream' }).then(console.log);

}

run(imgur)
