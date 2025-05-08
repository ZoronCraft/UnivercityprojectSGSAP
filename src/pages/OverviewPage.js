import React from "react";
import { Alert, Row, Col, Card } from "react-bootstrap";

function OverviewPage({ data }) {
  if (!data.length)
    return (
      <Alert variant="info">
        Upload data in "Data Analysis" section to see overview metrics.
      </Alert>
    );

  const voltageStabilityValues = data.map((d) => d.stab);
  const avgVoltageStability =
    voltageStabilityValues.reduce((a, b) => a + b, 0) / voltageStabilityValues.length;

  const tauValues = data.flatMap((d) => [d.tau1, d.tau2, d.tau3, d.tau4]);
  const meanTau = tauValues.reduce((a, b) => a + b, 0) / tauValues.length;
  const varianceTau =
    tauValues.reduce((sum, val) => sum + (val - meanTau) ** 2, 0) / tauValues.length;
  const stdDevTau = Math.sqrt(varianceTau);

  const currentLoad = data.reduce(
    (sum, d) =>
      sum +
      Math.abs(d.p1) +
      Math.abs(d.p2) +
      Math.abs(d.p3) +
      Math.abs(d.p4),
    0
  );

  const outageCount = data.filter((d) => d.stabf === "unstable").length;
  const outageDuration = outageCount * 5;

  const metrics = [
    {
      title: "Avg Voltage Stability",
      value: `${avgVoltageStability.toFixed(4)}`,
      variant: avgVoltageStability > 0.05 ? "success" : "danger",
    },
    {
      title: "Freq Deviation (std dev τ)",
      value: `${stdDevTau.toFixed(4)}`,
      variant: stdDevTau < 2 ? "success" : "warning",
    },
    {
      title: "Current Load (approx MW)",
      value: `${currentLoad.toFixed(2)}`,
      variant: currentLoad < 500 ? "success" : "warning",
    },
    {
      title: "Outage Duration (min)",
      value: `${outageDuration}`,
      variant: outageDuration === 0 ? "success" : "danger",
    },
  ];

  return (
    <>
      <h3 className="mb-4">Grid Overview</h3>
      <Row className="g-4">
        {metrics.map(({ title, value, variant }) => (
          <Col md={6} lg={3} key={title}>
            <Card border={variant} className="text-center h-100">
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default OverviewPage;
