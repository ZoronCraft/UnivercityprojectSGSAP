import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Menu from "./components/Menu";
import OverviewPage from "./pages/OverviewPage";
import DevicesPage from "./pages/DevicesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AlertsPage from "./pages/AlertsPage";
import DataAnalysisPage from "./pages/DataAnalysisPage";

function App() {
  // Shared grid data state
  const [gridData, setGridData] = useState([]);

  return (
    <Router>
      <Container className="py-4">
        <h1 className="mb-4">Smart Grid Stability Analytics Platform</h1>
        <Menu />
        <Routes>
          <Route path="/" element={<OverviewPage data={gridData} />} />
          <Route path="/devices" element={<DevicesPage data={gridData} />} />
          <Route path="/analytics" element={<AnalyticsPage data={gridData} />} />
          <Route path="/alerts" element={<AlertsPage data={gridData} />} />
          <Route
            path="/data"
            element={<DataAnalysisPage onDataLoaded={setGridData} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;













