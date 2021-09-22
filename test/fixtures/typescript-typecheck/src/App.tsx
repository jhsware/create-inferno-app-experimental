import * as Inferno from 'inferno';

class App extends Inferno.Component {
  render() {
    return <div>{format(123)}</div>;
  }
}

function format(value: string) {
  return value;
}

export default App;
