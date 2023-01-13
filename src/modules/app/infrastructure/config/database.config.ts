import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.DATABASE_MONGO_URL,
  user: process.env.DATABASE_MONGO_USER,
  password: process.env.DATABASE_MONGO_PASSWORD,
}));
