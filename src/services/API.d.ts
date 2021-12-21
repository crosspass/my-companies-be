declare namespace API {
  export interface CurrentUser {
    id: number;
    username: string;
    Email: string;
    status: string;
  }

  export interface LoginStateType {
    jwt: string;
  }
}
