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
  export: boolean;
  quiet: boolean;
  cron: string | undefined;
  native: boolean;
  "email-config": EmailConfig | null;
  rest: boolean;
};
export type SmtpConfig = {
  host: string;
  port: number;
  secure: false;
  auth:
    | {
        user: string | undefined;
        pass: string | undefined;
      }
    | undefined;
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

export type EmailConfig = {
  smtp: SmtpConfig;
  template: string | undefined;
  content: string | undefined;
  subject: string | undefined;
  to: Array<string>;
  from: Address;
};

export enum OutputResult {
  Path = "./results.json",
}
