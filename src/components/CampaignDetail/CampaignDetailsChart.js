import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const CampaignDetailsChart = (props) => {
  const { currentCampaign } = props;
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: 'doughnut',
    data: {
      labels: ['Appel réussi', 'Appel échoué', 'Appel ignoré'],
      datasets: [
        {
          label: 'Campagne(s) diffusée(s)',
          data: [10, 20, 30],
          backgroundColor: [
            'rgba(148, 228, 114, 1)',
            'rgba(228, 114, 114, 1)',
            'rgba(228, 202, 114, 1)',
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false, // Don't maintain w/h ratio
    },
  };
  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const updateDatasChart = () => {
    const data = [
      currentCampaign.call_success_count,
      currentCampaign.call_failed_count,
      currentCampaign.call_ignored_count,
    ];
    updateDataset(0, data);
  };

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
  }, [currentCampaign]);

  return (
    <div className="chart-container">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default CampaignDetailsChart;
