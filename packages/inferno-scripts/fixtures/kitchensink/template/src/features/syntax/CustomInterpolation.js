/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from 'inferno';

const styled = ([style]) =>
  style
    .trim()
    .split(/\s*;\s*/)
    .map(rule => rule.split(/\s*:\s*/))
    .reduce((rules, rule) => ({ ...rules, [rule[0]]: rule[1] }), {});

function load() {
  return [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
  ];
}

export default class CustomInterpolation extends Component {
  // static propTypes = {
  //   onReady: PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    const users = load();
    this.setState({ users });
  }

  componentDidUpdate() {
    this.props.onReady();
  }

  render() {
    const veryInlineStyle = styled`
      background: palevioletred;
      color: papayawhip;
    `;

    return (
      <div id="feature-custom-interpolation">
        {this.state.users.map(user => (
          <div key={user.id} style={veryInlineStyle}>
            {user.name}
          </div>
        ))}
      </div>
    );
  }
}
