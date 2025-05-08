import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup, ProgressBar, Table, Button, Form, Alert } from "react-bootstrap";
import Papa from "papaparse";

function Menu({ items, onSelect, selectedKey }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => onSelect(item.key)}
          style={{
            cursor: "pointer",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            background: selectedKey === item.key ? "#007bff" : "#f0f0f0",
            color: selectedKey === item.key ? "#fff" : "#333",
            fontWeight: selectedKey === item.key ? "bold" : "normal",
            boxShadow:
              selectedKey === item.key ? "0 2px 8px #007bff44" : "none",
            transition: "all 0.2s",
            userSelect: "none",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

function OverviewSection({ data }) {
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

function DevicesSection({ data }) {
  if (!data.length)
    return (
      <Alert variant="info">
        Upload data in "Data Analysis" section to see device status.
      </Alert>
    );

  const devices = ["g1", "g2", "g3", "g4"].map((gKey) => {
    const pKey = "p" + gKey.slice(1);
    const loads = data.map((d) => Math.abs(d[pKey]));
    const avgLoad = loads.reduce((a, b) => a + b, 0) / loads.length;

    let status = "Online";
    if (avgLoad > 2) status = "Warning";
    if (avgLoad === 0) status = "Offline";

    return {
      id: gKey,
      name: `Device ${gKey.toUpperCase()}`,
      status,
      load: avgLoad * 50,
    };
  });

  const statusVariant = {
    Online: "success",
    Warning: "warning",
    Offline: "danger",
  };

  return (
    <>
      <h3 className="mb-4">Devices Status</h3>
      <ListGroup>
        {devices.map(({ id, name, status, load }) => (
          <ListGroup.Item key={id} className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <strong>{name}</strong>
              <span className={`badge bg-${statusVariant[status]}`}>{status}</span>
            </div>
            <ProgressBar
              now={load}
              max={150}
              label={`${load.toFixed(1)} MW`}
              variant={load > 100 ? "danger" : "primary"}
              style={{ height: "1.5rem" }}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

function AnalyticsSection({ data }) {
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

function AlertsSection({ data }) {
  const [acknowledged, setAcknowledged] = useState([]);

  if (!data.length)
    return (
      <Alert variant="info">
        Upload data in "Data Analysis" section to see alerts.
      </Alert>
    );

  const unstableRows = data.filter((d) => d.stabf === "unstable");

  const acknowledgeAlert = (index) => {
    setAcknowledged((prev) => [...prev, index]);
  };

  return (
    <>
      <h3 className="mb-4">System Alerts</h3>
      {unstableRows.length === 0 && (
        <Alert variant="success">No current alerts. System is stable.</Alert>
      )}
      <ListGroup>
        {unstableRows.map((row, idx) => {
          const isAck = acknowledged.includes(idx);
          return (
            <ListGroup.Item
              key={idx}
              variant="danger"
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                {isAck ? (
                  <s>
                    Unstable condition detected: Stab={row.stab.toFixed(4)} at
                    τ1={row.tau1.toFixed(2)}, τ2={row.tau2.toFixed(2)}
                  </s>
                ) : (
                  <>
                    Unstable condition detected: Stab={row.stab.toFixed(4)} at
                    τ1={row.tau1.toFixed(2)}, τ2={row.tau2.toFixed(2)}
                  </>
                )}
              </div>
              {!isAck && (
                <Button
                  size="sm"
                  variant="outline-light"
                  onClick={() => acknowledgeAlert(idx)}
                >
                  Acknowledge
                </Button>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}

function DataAnalysisSection({ onDataLoaded }) {
  const [fileInfo, setFileInfo] = useState("");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setParsing(true);
    setFileInfo(file.name);
    setError(null);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const requiredCols = [
          "tau1",
          "tau2",
          "tau3",
          "tau4",
          "p1",
          "p2",
          "p3",
          "p4",
          "g1",
          "g2",
          "g3",
          "g4",
          "stab",
          "stabf",
        ];
        const colsPresent = requiredCols.every((col) =>
          results.meta.fields.includes(col)
        );
        if (!colsPresent) {
          setError(
            `CSV missing required columns. Required: ${requiredCols.join(", ")}`
          );
          setParsing(false);
          return;
        }

        const validData = results.data.filter(
          (row) => row.stabf === "stable" || row.stabf === "unstable"
        );

        onDataLoaded(validData);
        setParsing(false);
      },
      error: (err) => {
        setError("Error parsing CSV: " + err.message);
        setParsing(false);
      },
    });
  };

  return (
    <>
      <h3 className="mb-4">Grid Stability Data Upload</h3>

      <Form.Group className="mb-4">
        <Form.Label>Upload Smart Grid Data in (CSV)</Form.Label>
        <Form.Control
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={parsing}
        />
        <small className="text-muted">{fileInfo}</small>
      </Form.Group>

      {parsing && <ProgressBar animated now={100} label="Parsing CSV..." />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!parsing && !error && !fileInfo && (
        <Alert variant="secondary">
          Please upload a CSV file with smart grid stability data.
        </Alert>
      )}
    </>
  );
}

function App() {
  const menuItems = [
    { key: "overview", label: "Overview" },
    { key: "devices", label: "Devices" },
    { key: "analytics", label: "Analytics" },
    { key: "alerts", label: "Alerts" },
    { key: "data", label: "Data Analysis" },
  ];

  const [selectedMenu, setSelectedMenu] = useState("overview");
  const [gridData, setGridData] = useState([]);

  let sectionComponent;
  switch (selectedMenu) {
    case "devices":
      sectionComponent = <DevicesSection data={gridData} />;
      break;
    case "analytics":
      sectionComponent = <AnalyticsSection data={gridData} />;
      break;
    case "alerts":
      sectionComponent = <AlertsSection data={gridData} />;
      break;
    case "data":
      sectionComponent = <DataAnalysisSection onDataLoaded={setGridData} />;
      break;
    case "overview":
    default:
      sectionComponent = <OverviewSection data={gridData} />;
      break;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container className="py-4">
          <h1 className="mb-4">Smart Grid Stability Analytics Platform</h1>

          <Menu
            items={menuItems}
            onSelect={setSelectedMenu}
            selectedKey={selectedMenu}
          />

          <Row>
            <Col md={10} lg={8} className="mx-auto">
              {sectionComponent}
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;










