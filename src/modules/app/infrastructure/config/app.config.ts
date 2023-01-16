import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  app_port: process.env.APP_PORT,
}));
