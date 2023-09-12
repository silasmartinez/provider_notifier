const getChartData = () => {
  return [
    {
      patientId: "1234",
      dataType: "Blood pressure",
      dataValue: "55/30 Hg/mm",
      date: new Date(),
    },
    {
      patientId: "5678",
      dataType: "Blood type",
      dataValue: "A+",
      date: new Date(),
    },
    {
      patientId: "5678",
      dataType: "Blood pressure",
      dataValue: "120/100 Hg/mm",
      date: new Date(),
    },
    {
      patientId: "0987",
      dataType: "Blood pressure",
      dataValue: "215/160 Hg/mm",
      date: new Date(),
    },
  ];
};

module.exports = {
  getChartData,
};
