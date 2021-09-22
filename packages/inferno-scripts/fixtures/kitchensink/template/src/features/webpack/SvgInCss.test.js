import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import SvgInCss from './SvgInCss';

describe('svg in css', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    InfernoDOM.render(<SvgInCss />, div);
  });
});
