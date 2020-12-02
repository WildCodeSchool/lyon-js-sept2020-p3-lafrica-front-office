import React from 'react';
import './header.css';
import { slide as Menu } from 'react-burger-menu';

const Header = () => {
  return (
    <header>
      <Menu>
        <a id='home' className='menu-item' href='/'>
          Home
        </a>
        <a id='about' className='menu-item' href='/about'>
          About
        </a>
        <a id='contact' className='menu-item' href='/contact'>
          Contact
        </a>
      </Menu>

      <div className='menuBtn'>
        <ul>
          <li>
            <a href='?'>Accueil</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href='?'>Déconnexion</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
