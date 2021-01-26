import React, { useContext, useEffect, useState } from 'react';
import './statistics.css';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const Statistics = () => {
  const { userDetails } = useContext(UserContext);
  const [globalDatas, setGlobalDatas] = useState('');

  const datasFromApi = () => {
    API.get(`/users/${userDetails.id}/statistics`).then((res) => {
      setGlobalDatas(res.data);
      console.log(globalDatas);
    });
  };

  useEffect(() => {
    datasFromApi();
  }, []);

  return <div>Hello world</div>;
};

export default Statistics;
