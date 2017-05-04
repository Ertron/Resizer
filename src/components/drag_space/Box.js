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

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { title, yellow } = this.props;
    const backgroundColor = yellow ? 'yellow' : 'white';

      /*<div style={{ ...styles, backgroundColor }}>
       {title}
       </div>*/
    return (
      <img width={500} src={this.props.file} />
    );
  }
}
