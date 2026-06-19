import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [satellites, setSatellites] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/satellites")
      .then((res) => res.json())
      .then((data) => setSatellites(data));

    fetch("http://127.0.0.1:5000/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>OrbitalNet Satellite Operations Dashboard</h1>

      <h2>Satellite Telemetry</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Battery</th>
            <th>Temperature</th>
            <th>Signal</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {satellites.map((sat) => (
            <tr key={sat.id}>
              <td>{sat.name}</td>
              <td>{sat.battery}%</td>
              <td>{sat.temperature}°C</td>
              <td>{sat.signal}</td>
              <td>{sat.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Active Alerts</h2>

      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;