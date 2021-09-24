/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*  */
import { Component } from 'inferno';
import CodeBlock from './StackFrameCodeBlock';
import { getPrettyURL } from '../utils/getPrettyURL';


const linkStyle = (theme) => ({
  fontSize: '0.9em',
  marginBottom: '0.9em',
});

const anchorStyle = (theme) => ({
  textDecoration: 'none',
  color: theme.anchorColor,
  cursor: 'pointer',
});

const codeAnchorStyle = (theme) => ({
  cursor: 'pointer',
});

const toggleStyle = (theme) => ({
  marginBottom: '1.5em',
  color: theme.toggleColor,
  cursor: 'pointer',
  border: 'none',
  display: 'block',
  width: '100%',
  textAlign: 'left',
  background: theme.toggleBackground,
  fontFamily: 'Consolas, Menlo, monospace',
  fontSize: '1em',
  padding: '0px',
  lineHeight: '1.5',
});

class StackFrame extends Component {
  state = {
    compiled: false
  }

  toggleCompiled = () => {
    this.setState({
      compiled: !this.state,compiled
    })
  }

  getErrorLocation = () => {
    const {
      _originalFileName: fileName,
      _originalLineNumber: lineNumber,
    } = this.props.frame;
    // Unknown file
    if (!fileName) {
      return null;
    }
    // e.g. "/path-to-my-app/webpack/bootstrap eaddeb46b67d75e4dfc1"
    const isInternalWebpackBootstrapCode = fileName.trim().indexOf(' ') !== -1;
    if (isInternalWebpackBootstrapCode) {
      return null;
    }
    // Code is in a real file
    return { fileName, lineNumber: lineNumber || 1 };
  }

  editorHandler = () => {
    const errorLoc = this.getErrorLocation();
    if (!errorLoc) {
      return;
    }
    this.props.editorHandler(errorLoc);
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.editorHandler();
    }
  }

  render(props, { theme }) {
    const { frame, contextSize, critical, showCode } = props;
    const { compiled } = this.state;

    const {
      fileName,
      lineNumber,
      columnNumber,
      _scriptCode: scriptLines,
      _originalFileName: sourceFileName,
      _originalLineNumber: sourceLineNumber,
      _originalColumnNumber: sourceColumnNumber,
      _originalScriptCode: sourceLines,
    } = frame;
    const functionName = frame.getFunctionName();
  
    const url = getPrettyURL(
      sourceFileName,
      sourceLineNumber,
      sourceColumnNumber,
      fileName,
      lineNumber,
      columnNumber,
      compiled
    );
  
    let codeBlockProps = null;
    if (showCode) {
      if (
        compiled &&
        scriptLines &&
        scriptLines.length !== 0 &&
        lineNumber != null
      ) {
        codeBlockProps = {
          lines: scriptLines,
          lineNum: lineNumber,
          columnNum: columnNumber,
          contextSize,
          main: critical,
        };
      } else if (
        !compiled &&
        sourceLines &&
        sourceLines.length !== 0 &&
        sourceLineNumber != null
      ) {
        codeBlockProps = {
          lines: sourceLines,
          lineNum: sourceLineNumber,
          columnNum: sourceColumnNumber,
          contextSize,
          main: critical,
        };
      }
    }
  
    const canOpenInEditor =
      this.getErrorLocation() !== null && props.editorHandler !== null;
    return (
      <div>
        <div>{functionName}</div>
        <div style={linkStyle(theme)}>
          <span
            style={canOpenInEditor ? anchorStyle(theme) : null}
            onClick={canOpenInEditor ? this.editorHandler : null}
            onKeyDown={canOpenInEditor ? this.onKeyDown : null}
            tabIndex={canOpenInEditor ? '0' : null}
          >
            {url}
          </span>
        </div>
        {codeBlockProps && (
          <span>
            <span
              onClick={canOpenInEditor ? this.editorHandler : null}
              style={canOpenInEditor ? codeAnchorStyle(theme) : null}
            >
              <CodeBlock {...codeBlockProps} />
            </span>
            <button style={toggleStyle(theme)} onClick={this.toggleCompiled}>
              {'View ' + (compiled ? 'source' : 'compiled')}
            </button>
          </span>
        )}
      </div>
    );
  }
}


export default StackFrame;
