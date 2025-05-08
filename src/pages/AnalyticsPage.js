import React from "react";
import { Alert, Table } from "react-bootstrap";

function AnalyticsPage({ data }) {
  if (!data.length)
    return (
      <Alert variant="info">
        Upload data in "Data Analysis" section to see analytics.
      </Alert>
    );

  const stableCount = data.filter((d) => d.stabf === "stable").length;
  const unstableCount = data.filter((d) => d.stabf === "unstable").length;

  const predictions = [
    {
      id: 1,
      area: "Sector 1",
      riskLevel: stableCount > unstableCount ? "Low" : "Medium",
      forecast:
        stableCount > unstableCount
          ? "Stable voltage and frequency"
          : "Possible instability detected",
      action: stableCount > unstableCount ? "Monitor" : "Investigate",
    },
    {
      id: 2,
      area: "Sector 4",
      riskLevel: unstableCount > stableCount ? "High" : "Medium",
      forecast:
        unstableCount > stableCount
          ? "Potential overload in next 2 hours"
          : "Normal operation expected",
      action: unstableCount > stableCount ? "Prepare load shedding" : "Monitor",
    },
  ];

  const riskVariant = {
    Low: "success",
    Medium: "warning",
    High: "danger",
  };

  return (
    <>
      <h3 className="mb-4">Predictive Analytics</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Area</th>
            <th>Risk Level</th>
            <th>Forecast</th>
            <th>Recommended Action</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map(({ id, area, riskLevel, forecast, action }) => (
            <tr key={id}>
              <td>{area}</td>
              <td>
                <span className={`badge bg-${riskVariant[riskLevel]}`}>
                  {riskLevel}
                </span>
              </td>
              <td>{forecast}</td>
              <td>{action}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AnalyticsPage;
