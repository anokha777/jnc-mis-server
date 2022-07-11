import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { MisRoutes } from './src/routes/misrouter';

const app = express();
app.use(helmet());
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 8070;

app.listen(PORT, () => {
  console.log(
    '\x1b[32m',
    `***************************** Server is up on port ${PORT} *****************************`,
    '\x1b[32m'
  );
});

app.use('/api', new MisRoutes().router);

app.get('/api/health', (req: Request, res: Response) => {
  res.json(`jnc-mis service health is good, and runnubf on port ${PORT}`);
});

app.use((error: any, req: Request, res: Response, next: any) => {
  console.log('error - ', error);
  if (error)
    res
      .status(500)
      .send({ statusCode: error.statusCode, msg: error.error.msg });
  next();
});

app.use((req: Request, res: Response) => {
  res.status(404).send('NOT Found.');
});
