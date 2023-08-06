import { NewmanRunExecution } from "newman";

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
  serve: string;
  report: string | undefined;
  export: string | undefined;
  quiet: boolean;
  cron: string | undefined;
  native: boolean;
  emails: Array<string> | undefined;
  "email-config": string | undefined;
  "email-content": string | undefined;
  "email-subject": string | undefined;
};
export type SmtpConfig = {
  host: string;
  port: number;
  secure: false;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
};

export type ReportOptions = {
  executions: Array<NewmanRunExecution>;
  url: string;
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

export enum MessageType {
  HTML = "HTML",
  TEXT = "TEXT",
}

export type Message = {
  content: string;
  messageType: MessageType;
};

export type Address = {
  email: string;
  name?: string;
};
