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
      /*console.error('=====>>>>>>> moveBox: ', {x: left, y: top});*/
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: { left, top },
        },
      },
    }));
      left = left - this.props.calc_params.indent_left;
      top = top - this.props.calc_params.indent_top;
      if(left < - this.props.calc_params.indent_left * 2){
          left = - this.props.calc_params.indent_left * 2;
      }
      if(left > 0){
          left = 0;
      }
      if(top < - this.props.calc_params.indent_top * 2){
          top = - this.props.calc_params.indent_top * 2;
      }
      if(top > 0){
          top = 0;
      }
      this.props.dispatch({
          type: 'SET_CROP_OFFSET',
          coords: {x: left, y: top}
      });
      /*console.info('=====>>>>>>> moveBox: ', {x: left, y: top});*/
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
