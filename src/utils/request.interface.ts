export interface IOpts {
  url: string;
  method?: EMethod;
  params?: object;
  data?: object;
  headers?: object;
  timeout?: number;
}

type EMethod = "POST" | "GET" | "PUT" | "DELETE";

export interface IRequestRes<T> {
  code: number;
  data: T;
  resultMessage?: string;
  message?: string;
  error?: string;
  total?: number;
}
