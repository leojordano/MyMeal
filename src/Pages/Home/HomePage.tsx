import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Contexts/Auth';
import Sidebar from '../../Components/Sidebar/Sidebar';

import './style.scss';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return <div>HomePage</div>;
};

export default HomePage;
