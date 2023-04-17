import React, { FC, useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BiRightArrow } from 'react-icons/bi';
import { AuthContext } from '../../Contexts/Auth';
import { getAuth, User } from 'firebase/auth';

import Logo from '../../assets/images/logo.png';
import './style.scss';

const Sidebar: FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const auth = getAuth();

  const handleToggleSideMenu = () => {
    setIsOpen((state) => !state);
  };

  const getHIddenClasse = (cssClass?: string) => {
    return `${cssClass} ${isOpen ? '' : 'hide'}`;
  };

  const menus = [
    {
      label: 'Dashboard',
      icon: <AiFillHome />,
      goto: '/home',
      isActive: location.pathname === '/home'
    },
    {
      label: 'Produtos',
      icon: <AiFillHome />,
      goto: '/products',
      isActive: location.pathname === '/products'
    },
    {
      label: 'Colcaboradores',
      icon: <AiFillHome />,
      goto: '/',
      isActive: false
    }
  ];

  return (
    <div className={`sidebar ${isOpen ? '' : 'open'}`}>
      <div className="divider">
        <div
          className={`arrow-icon ${isOpen ? '' : 'active'}`}
          onClick={handleToggleSideMenu}
        >
          <BiRightArrow />
        </div>
      </div>

      <h3 className={getHIddenClasse()}>Nome da empresa</h3>

      <div className={getHIddenClasse('user-data')}>
        <img
          src={
            user?.photoURL ??
            'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?d=identicon'
          }
          alt=""
        />
        <span>{user?.displayName}</span>
      </div>

      <hr className={getHIddenClasse()} />

      <ul>
        {menus.map((menu, index) => (
          <li key={index} className={menu.isActive ? 'active' : ''}>
            <NavLink to={menu.goto}>
              {menu.icon}
              <span className={getHIddenClasse()}>{menu.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <button className="exit" onClick={() => auth.signOut()}>
        Sair
      </button>
    </div>
  );
};

export default Sidebar;
