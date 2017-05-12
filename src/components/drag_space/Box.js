import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import { connect } from 'preact-redux';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
};
@connect(state => state)
export default class Box extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    yellow: PropTypes.bool,
  };

    /*componentDidUpdate(){
        console.log('PROPS xxx : ',this.props);
    }*/

  render() {
    const display = this.props.file_props.url ? 'block' : 'none';

    return (
      <img style={{width: `${this.props.calc_params.width}px`, height: `${this.props.calc_params.height}px`, display: `${display}`}} src={this.props.file_props.url} />
    );
  }
}
