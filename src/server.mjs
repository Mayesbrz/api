import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import config from './config.mjs';
import routes from './controllers/routes.mjs';
import errorHandler from './middlewares/errorHandler.mjs';

dotenv.config();

const Server = class Server {
  constructor() {
    this.app = express();
    this.config = config[process.argv[2]] || config.development;
  }

  async dbConnect() {
    try {
      const host = this.config.mongodb;

      this.connect = await mongoose.createConnection(host, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const close = () => {
        this.connect.close((error) => {
          if (error) {
            console.error('[ERROR] api dbConnect() close() -> mongodb error', error);
          } else {
            console.log('[CLOSE] api dbConnect() -> mongodb closed');
          }
        });
      };

      this.connect.on('error', (err) => {
        setTimeout(() => {
          console.log('[ERROR] api dbConnect() -> mongodb error');
          this.connect = this.dbConnect(host);
        }, 5000);
        console.error(`[ERROR] api dbConnect() -> ${err}`);
      });

      this.connect.on('disconnected', () => {
        setTimeout(() => {
          console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected');
          this.connect = this.dbConnect(host);
        }, 5000);
      });

      process.on('SIGINT', () => {
        close();
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection');
        process.exit(0);
      });
    } catch (err) {
      console.error(`[ERROR] api dbConnect() -> ${err}`);
    }
  }

  middleware() {
    const limiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1h
      max: 100,
      message: 'Trop de requêtes, réessayez plus tard.'
    });

    this.app.use(helmet());
    this.app.use(cors({
      origin: ['http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(limiter);
  }

  routes() {
    new routes.Users(this.app, this.connect);
    new routes.Albums(this.app, this.connect);
    new routes.Photos(this.app, this.connect);

    this.app.use((req, res) => {
      res.status(404).json({ code: 404, message: 'Not Found' });
    });
  }

  async run() {
    try {
      await this.dbConnect();
      this.middleware();
      this.routes();
      this.app.use(errorHandler); 
      this.app.listen(this.config.port, () => {
        console.log(`✅ Serveur en ligne sur le port ${this.config.port}`);
      });
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`);
    }
  }
};

export default Server;
