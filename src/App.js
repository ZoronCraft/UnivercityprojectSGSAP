import React, { createContext, useState, useContext } from 'react';
import './App.css';
import { Container, Row, Col, Card, Button, ListGroup, ProgressBar } from 'react-bootstrap';

const AlertContext = createContext();

const withDeviceData = (Component) => (props) => {
  const [devices] = useState([
    { id: 1, name: 'Substation A', status: 'online', load: 85 },
    { id: 2, name: 'Solar Farm B', status: 'warning', load: 120 },
    { id: 3, name: 'Wind Turbine C', status: 'offline', load: 0 }
  ]);
  
  return <Component {...props} devices={devices} />;
};

function RealTimeMetrics({ voltage, frequency, demand }) {
  return (
    <Card className="mb-4">
      <Card.Header>Real-Time Grid Metrics</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <h5>Voltage: {voltage} kV</h5>
            <ProgressBar now={voltage} max={500} variant="danger" />
          </Col>
          <Col>
            <h5>Frequency: {frequency} Hz</h5>
            <ProgressBar now={frequency*10} variant="info" />
          </Col>
          <Col>
            <h5>Demand: {demand} MW</h5>
            <ProgressBar now={demand} max={1000} variant="success" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function AlertsPanel() {
  const { alerts } = useContext(AlertContext);
  
  return (
    <Card className="mb-4">
      <Card.Header>System Alerts</Card.Header>
      <ListGroup variant="flush">
        {alerts.map((alert, index) => (
          <ListGroup.Item key={index} variant={alert.variant}>
            {alert.message}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

const DeviceStatusList = withDeviceData(({ devices }) => (
  <Card>
    <Card.Header>Device Status</Card.Header>
    <ListGroup variant="flush">
      {devices.map(device => (
        <ListGroup.Item key={device.id}>
          <strong>{device.name}</strong> - {device.status}
          <ProgressBar now={device.load} max={150} className="mt-2" />
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card>
));

function GridControlPanel({ onCommand }) {
  const commands = ['Start All', 'Stop All', 'Emergency Shutdown'];
  
  return (
    <Card className="mt-4">
      <Card.Header>Grid Operations</Card.Header>
      <Card.Body>
        {commands.map(cmd => (
          <Button 
            key={cmd}
            variant="outline-primary" 
            className="me-2"
            onClick={() => onCommand(cmd)}
          >
            {cmd}
          </Button>
        ))}
      </Card.Body>
    </Card>
  );
}

function App() {
  const [gridMetrics] = useState({
    voltage: 480,
    frequency: 59.8,
    demand: 750
  });
  
  const [alerts] = useState([
    { variant: 'danger', message: 'Overload detected in Sector 4' },
    { variant: 'warning', message: 'Communication lost with Substation B' }
  ]);
  
  const handleGridCommand = (command) => {
    alert(`Executing grid command: ${command}`);
  };

  return (
    <AlertContext.Provider value={{ alerts }}>
      <div className="App">
        <header className="App-header">
          <Container className="py-4">
            <h1 className="mb-4">Smart Grid Control Center</h1>
            
            {/* Props drilling example */}
            <RealTimeMetrics {...gridMetrics} />
            
            <Row className="g-4">
              <Col md={8}>
                {/* Context usage */}
                <AlertsPanel />
                
                {/* Event passing */}
                <GridControlPanel onCommand={handleGridCommand} />
              </Col>
              
              <Col md={4}>
                {/* HOC data passing */}
                <DeviceStatusList />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    </AlertContext.Provider>
  );
}

export default App;





