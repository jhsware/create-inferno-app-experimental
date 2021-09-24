/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*  */

const closeButtonStyle = (theme) => ({
  color: theme.closeColor,
  lineHeight: '1rem',
  fontSize: '1.5rem',
  padding: '1rem',
  cursor: 'pointer',
  position: 'absolute',
  right: 0,
  top: 0,
});


function CloseButton({ close }, { theme }) {
  return (
    <span
      title="Click or press Escape to dismiss."
      onClick={close}
      style={closeButtonStyle(theme)}
    >
      ×
    </span>
  );
}

export default CloseButton;
