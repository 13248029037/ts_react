export interface ILoginparams {
  type: string;
  user_name: string;
  user_pswd: string;
}
export interface IuserLogin {
  userLogin: (data: ILoginparams) => Promise<boolean>;
}
export interface Iprops {
  login: IuserLogin;
}
