import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Menu() {
  return (
    <Nav variant="tabs" className="mb-4">
      <Nav.Item>
        <NavLink to="/" className="nav-link">
          Overview
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/devices" className="nav-link">
          Devices
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/analytics" className="nav-link">
          Analytics
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/alerts" className="nav-link">
          Alerts
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/data" className="nav-link">
          Data Analysis
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;
