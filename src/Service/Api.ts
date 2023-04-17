import Axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IUser, INITIAL_USER } from '../Hooks/useUser';

import { IErrorHandle } from './ApiInterfaces';

interface ILogin {
  user: IUser;
  token: string;
}

class Api {
  instance: AxiosInstance | null = null;

  baseURL: string = 'http://127.0.0.1:8000/api';

  token: string = '';

  constructor() {
    this.instance = Axios.create({
      baseURL: this.baseURL,
      headers: {
        token: this.token
      }
    });
  }

  setToken(tkn: string) {
    this.token = tkn;
  }

  async Login(login: string, password: string): Promise<ILogin> {
    let user: IUser = INITIAL_USER;
    let token: string = '';

    const res: AxiosResponse<ILogin> | undefined = await this.instance?.request(
      {
        url: '/login',
        method: 'POST',
        data: {
          name: login,
          password: password
        }
      }
    );

    if (res) {
      user = res.data.user;
      token = res.data.token;
    }

    return { user, token };
  }

  async LoginById(id: Number): Promise<ILogin> {
    let user: IUser = INITIAL_USER;
    let token: string = '';

    const res: AxiosResponse<ILogin> | undefined = await this.instance?.request(
      {
        url: '/login_by_id',
        method: 'POST',
        data: {
          id
        }
      }
    );

    if (res) {
      user = res.data.user;
      token = res.data.token;
    }

    return { user, token };
  }
}

const ApiInstance = new Api();

export default ApiInstance;
