const DEFAULT_PORT = 8080;

type Config = {
  PORT: number;
  NODE_ENV: string;
  APP_NAME: string;
  DATABASE_URL: string;
};

const config: Config = {
  PORT: Number(process.env.PORT) ?? DEFAULT_PORT,
  NODE_ENV: process.env.NODE_ENV as string,
  APP_NAME: process.env.APP_NAME as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
};

export default config;
