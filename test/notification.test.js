const { buildNoticeArray } = require("../controller/notification.controller");

describe("buldNoticeObject", () => {
  test("Will generate an array", () => {
    const result = buildNoticeArray();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("providerId");
    expect(result[0]).toHaveProperty("patients.0.patientId");
    expect(result[0]).toHaveProperty("patients.0.resultAlerts");
    expect(result[0]).toHaveProperty("patients.0.resultAlerts.minor");
    expect(result[1]).toHaveProperty("patients.0.resultAlerts.critical");
  });
});
