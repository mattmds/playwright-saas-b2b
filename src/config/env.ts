import { config } from 'dotenv';

const dotenvValues = config().parsed ?? {};

const requiredEnv = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  username:
    process.env.ORANGEHRM_USERNAME ??
    dotenvValues.ORANGEHRM_USERNAME ??
    dotenvValues.USERNAME,
  password: process.env.PASSWORD,
} as const;

if (!requiredEnv.username || !requiredEnv.password) {
  throw new Error('ORANGEHRM_USERNAME e PASSWORD precisam ser configurados no ambiente antes de executar os testes.');
}

export const env = {
  ...requiredEnv,
  username: requiredEnv.username,
  password: requiredEnv.password,
};
