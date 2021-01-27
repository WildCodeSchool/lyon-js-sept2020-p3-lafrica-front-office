/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import './CampaignDetails.scss';
import { FaMicrophone } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';
import { RiFileEditLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/fr';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';
import CampaignDetailsChart from './CampaignDetailsChart';

const CampaignDetail = (props) => {
  moment.locale('fr');

  const { userDetails, setUserDetails } = useContext(UserContext);
  const { match } = props;
  const history = useHistory();

  const [currentCampaign, setCurrentCampaign, setLoggedIn] = useState({
    id: 0,
    id_client_user: 0,
    name: '',
    text_message: '',
    vocal_message_file_url: '',
    date: '',
    sending_status: 0,
    lam_campaign_id: 0,
    count: 0,
    call_success_count: 0,
    call_failed_count: 0,
    call_ignored_count: 0,
  });
  const [campaignContacts, setCampaignContacts] = useState();
  const [winRate, setWinRate] = useState(0);

  useEffect(() => {
    setWinRate(currentCampaign.call_success_count / currentCampaign.count);
  }, [currentCampaign]);

  useEffect(() => {
    API.get(`/users/${userDetails.id}/campaigns/${match.params.campaign_id}`)
      .then((res) => {
        setCurrentCampaign(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLoggedIn(false);
          setUserDetails({});
          history.push('/signin');
        }
      });
    API.get(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}/contacts`
    )
      .then((res2) => {
        setCampaignContacts(res2.data.contacts);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLoggedIn(false);
          setUserDetails({});
          history.push('/signin');
        }
      });
  }, []);

  return (
    <>
      <div className="campaign-main-container">
        <div className="campaign-intro">
          <FaMicrophone className="micro-logo" />
          <div>
            <h2>Campagne</h2>
            <h3>{currentCampaign && currentCampaign.name}</h3>
          </div>
        </div>

        <div className="campaign-information">
          <table className="campaign-table">
            <tbody>
              <tr>
                <td>Date d'envoi</td>
                <td>
                  {currentCampaign &&
                    moment(currentCampaign.date).format('DD/MM/YYYY HH:mm')}
                </td>
              </tr>
              <tr>
                <td>Statut</td>
                <td>
                  {currentCampaign && currentCampaign.sending_status === 0
                    ? 'En création'
                    : currentCampaign && currentCampaign.sending_status === 1
                    ? 'En attente'
                    : 'Envoyé'}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="campaign-actions">
            <div className="edit-campaign">
              <RiFileEditLine
                className="edit-logo"
                onClick={() =>
                  history.push(
                    `/campaigns/editcampaign/${match.params.campaign_id}`
                  )
                }
              />
              <p>Modifier ma campagne</p>
            </div>
            <a
              className="export-stats"
              target="_blank"
              rel="noreferrer"
              href={`http://localhost:5000/users/${userDetails.id}/campaigns/${match.params.campaign_id}/exportStatistics`}
            >
              <BiExport className="export-logo" />
              <p>Exporter mes stats</p>
            </a>
          </div>
        </div>
        <div className="stats">
          <div className="stats-review">
            <div className="main-stats">
              <div>
                <h4 className="calls-total">
                  Nombre d'appels total :{' '}
                  {currentCampaign && currentCampaign.count}
                </h4>
              </div>
              <div className="success">
                <div className="calls-success-circle" />
                <h4 className="calls-success">
                  Nombre d'appels réussis :{' '}
                  {currentCampaign && currentCampaign.call_success_count}
                </h4>
              </div>
              <div className="failed">
                <div className="calls-failed-circle" />
                <h4 className="calls-failed">
                  Nombre d'appels échoués :{' '}
                  {currentCampaign && currentCampaign.call_failed_count}
                </h4>
              </div>{' '}
              <div className="ignored">
                <div className="calls-ignored-circle" />
                <h4 className="calls-ignored">
                  Nombre d'appels ignorés :{' '}
                  {currentCampaign && currentCampaign.call_ignored_count}
                </h4>
              </div>
            </div>
            <div
              className="win-rate"
              style={
                currentCampaign.sending_status !== 2
                  ? { display: 'none' }
                  : winRate.isNan
                  ? { backgroundColor: 'rgba(228, 114, 114, 1)' }
                  : winRate === 0
                  ? { backgroundColor: 'rgba(228, 114, 114, 1)' }
                  : winRate < 0.2
                  ? { backgroundColor: 'rgba(228, 114, 114, 1)' }
                  : winRate < 0.6
                  ? { backgroundColor: 'rgba(228, 202, 114, 1)' }
                  : { backgroundColor: 'rgba(148, 228, 114, 1)' }
              }
            >
              <p>
                Taux de réussite{' '}
                {currentCampaign &&
                  currentCampaign.call_success_count / currentCampaign.count}
                %
              </p>
            </div>
          </div>
          <div className="stats-array">
            <table>
              <thead>
                <tr>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th className="stylized-th">Nom</th>
                  <th className="stylized-th">Prénom</th>
                  <th className="stylized-th">Téléphone</th>
                  <th className="stylized-th">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaignContacts &&
                  campaignContacts.map((contact) => {
                    return (
                      <tr key={contact.id}>
                        <td>{contact.lastname}</td>
                        <td>{contact.firstname}</td>
                        <td>{contact.phone_number}</td>
                        <td>A mettre à jour en fonction de callStateId</td>
                        {/* Définir quel statut en fonction du callStateId */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="stats-chart">
            <CampaignDetailsChart currentCampaign={currentCampaign} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
