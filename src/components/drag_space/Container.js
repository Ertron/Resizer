import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import DraggableBox from './DraggableBox';
import { connect } from 'preact-redux';

const boxTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);
      /*console.log('DELTA : ', delta);
      console.log('item : ', item);*/

    component.moveBox(item.id, left, top);
  },
};
let styles = {
        width: 500,
        height: 400,
        border: '1px solid black',
        position: 'relative',
        margin: '0 0 0 0',
        overflow: 'hidden',
        zIndex: '200'
    };
@DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@connect(state => state)
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      boxes: {
        a: { top: 0, left: 0, title: 'Drag me around' },
      },
    };
  }

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: { left, top },
        },
      },
    }));
  }

  renderBox(item, key) {
    return (
      <DraggableBox key={key} id={key} {...item} />
    );
  }
  render() {
    const { connectDropTarget } = this.props;
    const { boxes } = this.state;
    return connectDropTarget(
      <div id="drag-container" style={{
          width: this.props.social.w,
          height: this.props.social.h,
          border: '1px solid black',
          position: 'relative',
          margin: '0 0 0 0',
          overflow: 'hidden',
          zIndex: '200'
        }}>
        {Object
          .keys(boxes)
          .map(key => this.renderBox(boxes[key], key))
        }
      </div>,
    );
  }
}
