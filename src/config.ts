const DEFAULT_PORT = 8080;

type Config = {
  PORT: number;
  NODE_ENV: string;
  APP_NAME: string;
  DATABASE_URL: string;
};

function readEnvString(key: string): string {
  const value = process.env[key];
  if (typeof value !== "string") {
    throw Error(`missing value for ${key}`);
  }
  return value;
}

function readEnvVariables(): Config {
  const port = Number(readEnvString("PORT") ?? DEFAULT_PORT);
  const environment = readEnvString("NODE_ENV");
  const name = readEnvString("APP_NAME");
  const databaseURL = readEnvString("DATABASE_URL");

  return {
    PORT: port,
    NODE_ENV: environment,
    APP_NAME: name,
    DATABASE_URL: databaseURL,
  };
}

function readConfig() {
  try {
    return readEnvVariables();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const config = readConfig();

export default config;
