import React, { useState } from "react";
import { Form, ProgressBar, Alert } from "react-bootstrap";
import Papa from "papaparse";

function DataAnalysisPage({ onDataLoaded }) {
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
        <Form.Label>Upload Smart Grid Data (CSV)</Form.Label>
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

export default DataAnalysisPage;
