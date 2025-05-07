import React from 'react'; // Import the React library
import './App.css'; // Import component-specific styles (optional for Hello World)

function App() {
  // This component returns JSX - HTML-like syntax within JavaScript
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1> {/* Our main content */}
        <p>
          Welcome to your first React application.
        </p>
      </header>
    </div>
  );
}

export default App;
