export type AppResponse<T> = {
  message: string;
  data: T;
  error?: string | null;
  status?: number;
};
