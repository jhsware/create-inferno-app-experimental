class App {
  constructor() {
    this.foo = this.foo.bind(this);
  }
  foo;
  foo() {
    return 'bar';
  }
}

export default App;
