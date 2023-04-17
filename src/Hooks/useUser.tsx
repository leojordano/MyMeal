import React, { useState } from 'react';

export interface IUser {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_USER: IUser = {
  id: 0,
  name: '',
  email: '',
  emailVerified: false,
  createdAt: '',
  updatedAt: ''
};

const useUser = () => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);

  return { user, setUser };
};

export default useUser;
