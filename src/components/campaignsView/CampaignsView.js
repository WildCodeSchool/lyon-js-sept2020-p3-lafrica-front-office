import React, { useContext, useEffect, useState } from 'react';
import './CampaignsView.css';
import { FaMicrophone } from 'react-icons/fa';
import { GoMegaphone } from 'react-icons/go';
import { BiEdit, BiSearchAlt2 } from 'react-icons/bi';
// import { useHistory, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import API from '../../services/API';

import { UserContext } from '../../context/UserContext';

const CampaignsView = () => {
  moment.locale('fr');

  const history = useHistory();

  const {
    userDetails,
    setLoggedIn,
    campaignsList,
    setCampaignsList,
  } = useContext(UserContext);
  const [campaignId, setCampaignId] = useState();

  useEffect(() => {
    if (userDetails) {
      API.get(`/users/${userDetails.id}/campaigns`)
        .then((res) => setCampaignsList(res.data))
        .catch(() => setLoggedIn(false));
    }
  }, [userDetails]);

  const showCampaignsList = () => {
    return campaignsList.map((campaign) => {
      return (
        <tr key={campaign.id}>
          <td className="no-border">
            <BiSearchAlt2
              className="search-icon"
              onClick={() => history.push(`/campaigns/${campaign.id}`)}
            />
          </td>
          <td className="stylized-td">{campaign.name}</td>
          <td className="stylized-td">
            {moment(campaign.date).format('DD/MM/YYYY HH:mm')}
          </td>
          <td className="stylized-td">
            {campaign.sending_status ? (
              <div className="cell-campaign-status">
                <span className="status finished-status" />
                <p>Envoyée</p>
              </div>
            ) : (
              <div className="cell-campaign-status">
                <span className="status in-progress-status" />
                <p>En attente</p>
              </div>
            )}
          </td>
          <td className="same-width-than-search-icon no-border" />
        </tr>
      );
    });
  };

  const createCampaignInDatabase = async () => {
    await API.post(`/users/${userDetails.id}/campaigns`).then((res) => {
      setCampaignId(res.data.campaign_id);
    });
  };

  useEffect(() => {
    if (campaignId) {
      history.push(`/campaigns/edit/${campaignId}`);
    }
  }, [campaignId]);

  return (
    <div className="compaigns-view-container">
      <article className="campaings-editor-view-container">
        <div className="campaigns-editor-view">
          <div className="title">
            <FaMicrophone className="microphone-icon" />
            <h2>NOS SOLUTIONS DE VOCALISATION</h2>
          </div>
          <div className="btn-container">
            <div
              className="megaphone"
              onClick={createCampaignInDatabase}
              type="button"
              onKeyPress={() => {}}
              role="button"
              tabIndex="0"
            >
              <GoMegaphone className="btn-icon" />

              {/* <Link to={`/campaigns/${campaignId}`}>
              </Link>
              <Link
                to={`/campaigns/${campaignId}`}
                onClick={createCampaignInDatabase}
              > */}
              <h3>Créer une campagne</h3>
              {/* </Link> */}
            </div>
            <div className="edit">
              <BiEdit className="btn-icon" />
              <h3>Editer / ré-utiliser une campagne </h3>
            </div>
          </div>
        </div>
      </article>
      <article>
        <div className="campaigns-list">
          <div className="filter-container">
            <p>Voir pour système de filtre et de tri</p>
          </div>
          <table>
            <thead>
              <tr>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
                <th className="stylized-th">Nom</th>
                <th className="stylized-th">Date d'envoi</th>
                <th className="stylized-th">Statut</th>
              </tr>
            </thead>
            <tbody>{showCampaignsList()}</tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

export default CampaignsView;
