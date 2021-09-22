import Inferno from 'inferno';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://infernojs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Inferno
        </a>
      </header>
    </div>
  );
}

export default App;
