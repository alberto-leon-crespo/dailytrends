import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('database', () => ({
  uri: process.env.DATABASE_MONGO_URL,
  user: process.env.DATABASE_MONGO_USER,
  password: process.env.DATABASE_MONGO_PASSWORD,
  database: process.env.DATABASE_MONGO_NAME,
}));
