/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*  */
import { Component } from 'inferno';


const overlayStyle = (theme) => ({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  height: '100%',
  width: '1024px',
  maxWidth: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: '0.5rem',
  boxSizing: 'border-box',
  textAlign: 'left',
  fontFamily: 'Consolas, Menlo, monospace',
  fontSize: '11px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: 1.5,
  color: theme.color,
});


let iframeWindow = null;

class ErrorOverlay extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    if (iframeWindow) {
      iframeWindow.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    if (iframeWindow) {
      iframeWindow.removeEventListener('keydown', this.onKeyDown);
    }
  }

  getIframeWindow = (element) => {
    if (element) {
      const document = element.ownerDocument;
      iframeWindow = document.defaultView;
    }
  }

  onKeyDown = (e) => {
    if (this.props.shortcutHandler) {
      this.props.shortcutHandler(e.key);
    }
  }

  render(props, { theme }) {
    return (
      <div style={overlayStyle(theme)} ref={this.getIframeWindow}>
        {props.children}
      </div>
    );
  }
}

export default ErrorOverlay;
