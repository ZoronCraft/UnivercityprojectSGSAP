import React, { useState } from "react";
import { Alert, ListGroup, Button } from "react-bootstrap";

function AlertsPage({ data }) {
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

export default AlertsPage;
