import React, { useContext, useEffect, useState } from 'react';
import './statistics.css';
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
      console.log(totalSendCampaignsPerUsers);
    });
  };

  const mappingForTotalSendCampaignsPerUser = () => {
    return totalSendCampaignsPerUsers.map((el) => {
      return <p>{el.firstname}</p>;
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

  return (
    <div className="stats-container">
      <h1>Total des appels émis</h1>
      <p>{sendCallCount}</p>
      <h1>Total des Campagnes</h1>
      <p>{totalSendCampaigns}</p>
      <div>{mappingForTotalSendCampaignsPerUser()}</div>
    </div>
  );
};

export default Statistics;
