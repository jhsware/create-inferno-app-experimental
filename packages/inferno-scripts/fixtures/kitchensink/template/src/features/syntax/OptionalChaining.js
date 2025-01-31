/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from 'inferno';

function load() {
  return [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
  ];
}

export default class OptionalChaining extends Component {
  // static propTypes = {
  //   onReady: PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    const users = load?.();
    this.setState({ users });
  }

  componentDidUpdate() {
    this.props.onReady();
  }

  render() {
    return (
      <div id="feature-optional-chaining">
        {this.state.users.map(user => (
          <div key={user.id}>{user?.name}</div>
        ))}
      </div>
    );
  }
}
