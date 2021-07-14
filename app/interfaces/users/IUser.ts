export interface IUser {
  _id: string;
  name: string;
  systemId: string;
  email: string;
  password: string;
  }
  
  export interface IUserInput {
    name?: string;
    systemId?: string;
    email?: string;
    password?: string;

  }
  