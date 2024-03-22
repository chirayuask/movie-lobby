export interface userModalSchema {
  userName: string;
  password: string;
  role: string;
}

export interface userValidationPromise {
  success: boolean;
  msg: string;
  properties: {
    userName: string;
    password: string;
    role: string;
  };
}