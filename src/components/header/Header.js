import React, { useContext, useState, useEffect } from 'react';
import './header.css';
import { slide as Menu } from 'react-burger-menu';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const Header = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { userDetails, setUserDetails, loggedIn, setLoggedIn } = useContext(
    UserContext
  );

  const [campaignId, setCampaignId] = useState();

  const handleLogOut = async () => {
    try {
      await API.get('/auth/logout');
      await setUserDetails('');
      await setLoggedIn(false);
      history.push('/signin');
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

  const createCampaignInDatabase = async () => {
    await API.post(`/users/${userDetails.id}/campaigns`).then((res) => {
      setCampaignId(res.data.campaign_id);
    });
  };

  useEffect(() => {
    if (campaignId) {
      history.push(`/campaigns/createcampaign/${campaignId}`);
    }
  }, [campaignId]);

  return (
    <header>
      <div className={loggedIn ? 'logoutBtn-true' : 'logoutBtn-false'}>
        <Menu>
          <div id="home" className="menu-item" href="/">
            <BsFillPersonFill size={150} color="white" />
            <p>
              Bonjour {userDetails.firstname} {userDetails.lastname}
            </p>
          </div>
          <Link to="/">ACCUEIL</Link>

          {userDetails.role === 'admin' ? (
            <Link to="/stats"> STATISTIQUES</Link>
          ) : (
            <div
              className="create-campaign"
              onClick={createCampaignInDatabase}
              type="button"
              onKeyPress={() => {}}
              role="button"
              tabIndex="0"
            >
              CREER UNE CAMPAGNE
            </div>
          )}
        </Menu>
      </div>
      <div className="userTitle">
        {userDetails.firstname} {userDetails.lastname}
      </div>

      <div className="menuBtn">
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
        </ul>
        <ul>
          <li className={loggedIn ? 'logoutBtn-true' : 'logoutBtn-false'}>
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
