const _ = require("lodash");
const { getChartData } = require("../services/chartingData.service");
const { evaluateChartItem } = require("../services/evaluator.service");
const { getProviderMap } = require("../services/provider.service");

const buildNoticeArray = () => {
  // this would be some sort of db/data store lookup, triggered by
  // the CSV upload - it consists of a list of all charting results
  // (as individual result items) by a date range
  const rawCharts = getChartData();

  // parse the raw charting data, adding enough detail to generate a notification
  const resultObject = rawCharts.reduce((output, chartItem) => {
    // process the raw charting item, appending alert conditions as
    // appropriate
    const evaluatedResult = evaluateChartItem(chartItem);

    // get list of providers as a map - this should be cached, would be
    // expensive to have to rebuild every time.
    const providerMap = getProviderMap();
    const provider = providerMap[evaluatedResult?.patientId];
    // punt if no provider or patient found
    if (!provider) return output;
    const patient = evaluatedResult?.patientId;
    if (!patient) return output;

    // This may look more complicated than it is. _.setWith() makes building complex objects
    // much simpler.

    // set providerId
    _.setWith(output, `${provider}.providerId`, provider);

    // set patientId
    _.setWith(output, `${provider}.patients.${patient}.patientId`, patient);

    // set and update result count per patient
    const patResultCount = _.get(
      output,
      `${provider}.patients.${patient}.resultCount`,
      0,
    );
    _.setWith(
      output,
      `${provider}.patients.${patient}.resultCount`,
      patResultCount + 1,
      Object,
    );

    // build and update alerts per patient
    const alerts = _.get(
      output,
      `${provider}.patients.${patient}.resultAlerts`,
      {},
    );
    if (evaluatedResult?.resultNotice) {
      alerts[evaluatedResult.resultNotice] =
        (alerts[evaluatedResult.resultNotice] || 0) + 1;
    }
    _.setWith(
      output,
      `${provider}.patients.${patient}.resultAlerts`,
      alerts,
      Object,
    );

    return output;
  }, {});

  // because we use reduce to generate a complex cumulative mapped object, we
  // then need to turn the map into a list for delivery
  return Object.values(resultObject).map((provider) => {
    return {
      providerId: provider.providerId,
      patients: Object.values(provider.patients),
    };
  });
};

module.exports = {
  buildNoticeArray,
};
