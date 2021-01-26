import React, { useContext, useEffect, useState } from 'react';
import './CampaignDetails.scss';
import { FaMicrophone } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';
import { RiFileEditLine } from 'react-icons/ri';
import moment from 'moment';
import 'moment/locale/fr';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';
import CampaignEditor from './subcomponents/CampaingEditor';

const CampaignDetail = (props) => {
  moment.locale('fr');

  const { userDetails } = useContext(UserContext);
  const [editorView, setEditorView] = useState(false);
  const { match } = props;
  const [currentCampaign, setCurrentCampaign] = useState();

  const toggleEditorView = () => {
    setEditorView(!editorView);
  };

  useEffect(() => {
    API.get(
      `/users/${userDetails.id}/campaigns/${match.params.campaign_id}`
    ).then((res) => setCurrentCampaign(res.data));
  }, []);

  return (
    <>
      {editorView ? (
        <CampaignEditor campaignId={match.params.campaign_id} />
      ) : (
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
            <div className="btn-container">
              <div
                type="button"
                className="edit-campaign"
                onClick={toggleEditorView}
                onKeyPress={() => {}}
                role="button"
                tabIndex="0"
              >
                <RiFileEditLine className="edit-logo" />
                <h3>Modifier ma campagne</h3>
              </div>
            </div>
          </div>
          <div className="statistiques">
            <div className="export-statistiques">
              <a
                target="_blank"
                rel="noreferrer"
                href={`http://localhost:5000/users/${userDetails.id}/campaigns/1/exportStatistics`}
              >
                <BiExport className="export-logo" />
                <p>Exporter mes statistiques</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignDetail;
