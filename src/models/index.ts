export type SupermanInput = {
  collection: string;
  environment: string | undefined;
};

export type NewmanOptions = {
  iteration: number;
  file: string | undefined;
  port: string | undefined;
  globals: string | undefined;
  url: string | undefined;
  serve: boolean;
  report: string | undefined;
};

export type Environment = {
  id: string;
  name: string;
  values: Array<EnvironmentValue>;
};

type EnvironmentValue = {
  key: string;
  value: string;
  type: string;
  enabled: boolean;
};
