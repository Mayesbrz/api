import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import Server from './src/server.mjs';

dotenv.config();

const sslOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

const server = new Server();

server.run().then(() => {
  https.createServer(sslOptions, server.app)
    .listen(3443, () => {
      console.log('🔐 HTTPS server running at https://localhost:3443');
    });
});
