import React, { useContext, useEffect, useState } from 'react';
import './statistics.scss';
import { Pie } from 'react-chartjs-2';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const Statistics = () => {
  const { userDetails } = useContext(UserContext);
  const [globalDatas, setGlobalDatas] = useState([]);
  const [sendCallCount, setSendCallCount] = useState(0);
  const [totalSendCampaigns, setTotalSendCampaigns] = useState(0);
  const [totalSendCampaignsPerUsers, setTotalSendCampaignsPerUsers] = useState(
    []
  );

  const datasFromApi = () => {
    API.get(`/users/${userDetails.id}/statistics`).then((res) => {
      setGlobalDatas(res.data.callsDatas);
      setTotalSendCampaigns(res.data.totalCampaignsSent);
      setTotalSendCampaignsPerUsers(res.data.totalCampaignsPerUsers);
    });
  };

  const mappingForTotalSendCampaignsPerUser = () => {
    return totalSendCampaignsPerUsers.map((el) => {
      return (
        <tbody>
          <tr>
            <td>{el.firstname}</td>
            <td>{el.lastname}</td>
            <td>{el.total}</td>
          </tr>
        </tbody>
      );
    });
  };

  useEffect(() => {
    datasFromApi();
  }, []);

  useEffect(() => {
    globalDatas.forEach((el) => {
      if (el.call_state_id) {
        setSendCallCount((prevCount) => prevCount + 1);
      }
    });
  }, [globalDatas]);

  // TRAITEMENT DES DATAS POUR LE GRAPHIQUE

  const mappingNameForChart = () => {
    return totalSendCampaignsPerUsers.map((el) => {
      return `${el.firstname} ${el.lastname}`;
    });
  };

  const mappingTotalForChart = () => {
    return totalSendCampaignsPerUsers.map((el) => {
      return el.total;
    });
  };

  const data = {
    labels: mappingNameForChart(),
    datasets: [
      {
        data: mappingTotalForChart(),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#b9936c',
          '#eca1a6',
          '#e3eaa7',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#b9936c',
          '#eca1a6',
          '#e3eaa7',
        ],
      },
    ],
    options: {
      maintainAspectRatio: false,
    },
  };

  return (
    <div className="stats-view-container">
      <div className="title">
        <h2>Statistiques</h2>
      </div>
      <div className="stats-container">
        <h4>Données globales</h4>
        <table>
          <thead>
            <tr>
              <th>Nombre total d'appels envoyés</th>
              <th>Nombre total de Campagnes envoyées</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{sendCallCount}</td>
              <td>{totalSendCampaigns}</td>
            </tr>
          </tbody>
        </table>
        <h4>Données détaillées</h4>
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom </th>
              <th>Nombre de Campagnes envoyées</th>
            </tr>
          </thead>
          {mappingForTotalSendCampaignsPerUser()}
        </table>
        <div className="stats-charts">
          <h4>Campagnes / Clients</h4>
          <Pie
            data={data}
            options={{ maintainAspectRatio: false }}
            width="30%"
            height={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
