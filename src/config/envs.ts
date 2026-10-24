import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),

  DB_HOST: get('DB_HOST').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_NAME: get('DB_NAME').required().asString(),
  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),

  MAILER_HOST: get('MAILER_HOST').required().asString(),
  MAILER_PORT: get('MAILER_PORT').required().asPortNumber(),
  MAILER_USER: get('MAILER_USER').required().asString(),
  MAILER_PASSWORD: get('MAILER_PASSWORD').required().asString(),
  MAILER_FROM: get('MAILER_FROM').required().asString(),

  MAINTENANCE_EMAIL: get('MAINTENANCE_EMAIL').required().asString(),

  AWS_ACCESS_KEY_ID: get('AWS_ACCESS_KEY_ID').required().asString(),
  AWS_SECRET_ACCESS_KEY: get('AWS_SECRET_ACCESS_KEY').required().asString(),
  AWS_REGION: get('AWS_REGION').required().asString(),
  AWS_S3_BUCKET: get('AWS_S3_BUCKET').required().asString(),
};
