/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import './CampaignDetails.scss';
import { FaMicrophone } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';
import { RiFileEditLine } from 'react-icons/ri';
import moment from 'moment';
import 'moment/locale/fr';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const CampaignDetail = (props) => {
  moment.locale('fr');

  const { userDetails } = useContext(UserContext);
  const { match } = props;

  const [currentCampaign, setCurrentCampaign] = useState();
  const [campaignContacts, setCampaignContacts] = useState();

  useEffect(() => {
    API.get(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}`
    ).then((res) => {
      setCurrentCampaign(res.data);
    });
    API.get(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}/contacts`
    ).then((res2) => {
      setCampaignContacts(res2.data);
      console.log(campaignContacts);
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
                <td>Date d'envoi :</td>
                <td>
                  {currentCampaign &&
                    moment(currentCampaign.date).format('DD/MM/YYYY HH:mm')}
                </td>
              </tr>
              <tr>
                <td>Statut: </td>
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
          <div className="edit-campaign">
            <RiFileEditLine className="edit-logo" />
            Modifier ma campagne
          </div>
        </div>
        <div className="stats">
          <div className="export-stats">
            <BiExport className="export-logo" />
            <p>Exporter mes stats</p>
          </div>
          <div className="main-stats">
            <h4>
              Nombre d'appels total : {currentCampaign && currentCampaign.count}
            </h4>
            <h4>
              Nombre d'appels réussis :{' '}
              {0 && currentCampaign.call_success_count}
            </h4>
            <h4>
              Nombre d'appels échoués :{' '}
              {currentCampaign && currentCampaign.call_failed_count}
            </h4>
            <h4>
              Nombre d'appels ignorés :{' '}
              {currentCampaign && currentCampaign.call_ignored_count}
            </h4>
          </div>
          <div className="win-rate">
            <p>
              Taux de réussite :{' '}
              {currentCampaign &&
                currentCampaign.call_success_count / currentCampaign.count}
              %
            </p>
          </div>
          <div className="stats-array">
            <table>
              <thead>
                <tr>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th />
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
                        <td>Appel failed</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="stats-chart">
            <p> A changer</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
