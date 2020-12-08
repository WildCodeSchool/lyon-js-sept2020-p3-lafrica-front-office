import React from 'react';
import './header.css';
import { slide as Menu } from 'react-burger-menu';
import { BsFillPersonFill } from 'react-icons/bs';

const Header = () => {
  return (
    <header>
      <Menu>
        <div id='home' className='menu-item' href='/'>
          <BsFillPersonFill size={150} color='white' />
          <p>Bonjour Utilisateur</p>
        </div>

        <a id='user' className='menu-item' href='/about'>
          COMPTE UTILISATEUR
        </a>
        <a id='sms' className='menu-item' href='/contact'>
          SMS
        </a>
        <a id='voix' className='menu-item' href='/contact'>
          VOIX
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
