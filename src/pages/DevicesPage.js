import React from "react";
import { Alert, ListGroup, ProgressBar } from "react-bootstrap";

function DevicesPage({ data }) {
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

export default DevicesPage;
