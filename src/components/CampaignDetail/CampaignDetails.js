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

  useEffect(() => {
    API.get(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}`
    ).then((res) => setCurrentCampaign(res.data.campaignData));
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
                  {currentCampaign && currentCampaign.sending_status
                    ? 'Envoyée'
                    : 'En cours'}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="edit-campaign">
            <RiFileEditLine className="edit-logo" />
            Modifier ma campagne
          </div>
        </div>
        <div className="statistiques">
          <div className="export-statistiques">
            <BiExport className="export-logo" />
            <p>Exporter mes statistiques</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
