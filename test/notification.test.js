const { buildNoticeArray } = require("../controller/notification.controller");

describe("buldNoticeArray", () => {
  beforeAll(() => {
    result = buildNoticeArray();
  });

  test("Will generate a list of providers", () => {
    expect(Array.isArray(result)).toBe(true);
  });

  test("Provider list will identify a provider", () => {
    expect(result[0]).toHaveProperty("providerId");
  });

  test("Provider elements will have a list of patients", () => {
    expect(Array.isArray(result[0].patients));
  });

  test("Patient elements will identify patients and their alerts", () => {
    expect(result[0]).toHaveProperty("patients.0.patientId");
    expect(result[0]).toHaveProperty("patients.0.resultAlerts");
    expect(result[0]).toHaveProperty("patients.0.resultAlerts.minor");

    expect(result[1]).toHaveProperty("patients.0.resultAlerts.critical");
  });
});
