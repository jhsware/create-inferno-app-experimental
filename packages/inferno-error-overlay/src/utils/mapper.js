/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*       */
import StackFrame from './stack-frame';
import { getSourceMap } from './getSourceMap';
import { getLinesAround } from './getLinesAround';
import { settle } from 'settle-promise';

/**
 * Enhances a set of <code>StackFrame</code>s with their original positions and code (when available).
 * @param {StackFrame[]} frames A set of <code>StackFrame</code>s which contain (generated) code positions.
 * @param {number} [contextLines=3] The number of lines to provide before and after the line specified in the <code>StackFrame</code>.
 */
async function map(
  frames              ,
  contextLines         = 3
)                        {
  const cache      = {};
  const files           = [];
  frames.forEach(frame => {
    const { fileName } = frame;
    if (fileName == null) {
      return;
    }
    if (files.indexOf(fileName) !== -1) {
      return;
    }
    files.push(fileName);
  });
  await settle(
    files.map(async fileName => {
      const fetchUrl =
        fileName.indexOf('webpack-internal:') === 0
          ? `/__get-internal-source?fileName=${encodeURIComponent(fileName)}`
          : fileName;

      const fileSource = await fetch(fetchUrl).then(r => r.text());
      const map = await getSourceMap(fileName, fileSource);
      cache[fileName] = { fileSource, map };
    })
  );
  return frames.map(frame => {
    const { functionName, fileName, lineNumber, columnNumber } = frame;
    let { map, fileSource } = cache[fileName] || {};
    if (map == null || lineNumber == null) {
      return frame;
    }
    const { source, line, column } = map.getOriginalPosition(
      lineNumber,
      columnNumber
    );
    const originalSource = source == null ? [] : map.getSource(source);
    return new StackFrame(
      functionName,
      fileName,
      lineNumber,
      columnNumber,
      getLinesAround(lineNumber, contextLines, fileSource),
      functionName,
      source,
      line,
      column,
      getLinesAround(line, contextLines, originalSource)
    );
  });
}

export { map };
export default map;
