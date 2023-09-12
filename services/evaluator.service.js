const evaluateChartItem = (chartData) => {
  // This would take the chart data, and evaluate whether that result was a
  // alert status for this patient. We don't have such a service, this is of
  // course mock data.
  const resultMap = {
    // prettier-ignore
    "1234": "minor",
    "0987": "critical",
  };
  // append resultNotice to the charting data
  if (resultMap[chartData?.patientId]) {
    chartData.resultNotice = resultMap[chartData.patientId];
  }
  return chartData;
};

module.exports = {
  evaluateChartItem,
};
