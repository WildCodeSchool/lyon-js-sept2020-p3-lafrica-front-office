import React from 'react';
import './header.css';
import { slide as Menu } from 'react-burger-menu';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../../services/API';

const Header = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const handleLogOut = async () => {
    try {
      await API.get('/auth/logout');
      history.push('/');
      addToast('Déconnexion réussie !', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch {
      addToast('Echec de déconnexion !', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <header>
      <Menu>
        <div id="home" className="menu-item" href="/">
          <BsFillPersonFill size={150} color="white" />
          <p>Bonjour Utilisateur</p>
        </div>
        <Link to="/">ACCUEIL</Link>
        <Link to="/signIn">S'IDENTIFIER</Link>
        {/* <a id='user' className='menu-item' href='/about'>
          ADMINISTRATION
        </a>
        <a id='user' className='menu-item' href='/about'>
          COMPTE UTILISATEUR
        </a>
        <a id='sms' className='menu-item' href='/contact'>
          SMS
        </a> */}
        <Link to="/users/:user_id/createCampaign">CREER UNE CAMPAGNE</Link>
      </Menu>

      <div>Bonjour utilisateur</div>

      <div className="menuBtn">
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
        </ul>
        <ul>
          <li>
            <button type="button" onClick={handleLogOut}>
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
