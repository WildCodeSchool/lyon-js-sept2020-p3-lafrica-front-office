import React, { useEffect, useRef, useState, useContext } from 'react';
import Chartjs from 'chart.js';
import moment from 'moment';
import 'moment/locale/fr';
import './CampaignsChart.scss';
import API from '../../services/API';

import { UserContext } from '../../context/UserContext';

// const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const Chart = () => {
  const { userDetails } = useContext(UserContext);
  moment.locale('en');

  const [monthlySentCampaigns, setMonthlySentCampaigns] = useState({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    Auguste: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  });
  const chartConfig = {
    type: 'bar',
    data: {
      labels: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Setptembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      datasets: [
        {
          label: 'Campagne(s) diffusée(s)',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [campaignsListChart, setCampaignsListChart] = useState([]);

  const countCampaignsPerMonth = () => {
    const campaignsByMonth = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      Auguste: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    for (let i = 0; i < campaignsListChart.length; i += 1) {
      if (campaignsListChart[i].sending_status === 2) {
        const campaignMonth = moment(campaignsListChart[i].date).format('MMMM');
        campaignsByMonth[campaignMonth] += 1;
      }
    }
    setMonthlySentCampaigns(campaignsByMonth);
  };

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const updateDatasChart = () => {
    const data = [
      monthlySentCampaigns.January,
      monthlySentCampaigns.February,
      monthlySentCampaigns.March,
      monthlySentCampaigns.April,
      monthlySentCampaigns.May,
      monthlySentCampaigns.June,
      monthlySentCampaigns.July,
      monthlySentCampaigns.Auguste,
      monthlySentCampaigns.September,
      monthlySentCampaigns.October,
      monthlySentCampaigns.November,
      monthlySentCampaigns.December,
    ];
    updateDataset(0, data);
  };

  useEffect(() => {
    countCampaignsPerMonth();
  }, [campaignsListChart]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartInstance) {
      updateDatasChart();
    }
  }, [monthlySentCampaigns]);

  useEffect(() => {
    API.get(`/users/${userDetails.id}/campaigns?limit=10000,`).then((res) => {
      setCampaignsListChart(res.data.campaigns);
    });
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;
