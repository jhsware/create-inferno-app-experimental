import Inferno, { Component } from 'inferno';
import myImport from '../OutOfScopeImport';

class App extends Component {
  render() {
    return <div className="App">{myImport}</div>;
  }
}

export default App;
