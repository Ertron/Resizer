import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props;
      /*console.log('PROPS : ', props);*/
    return { id, left, top };
  },
  canDrag(props, monitor){
    /*console.log('canDrag : ', props);*/
    return true;
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { hideSourceOnDrag, left, top, connectDragSource, isDragging, children } = this.props;
    if(isDragging){
      console.log('RESULT : ', this);
    }
    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return connectDragSource(
      <div style={{ ...style, left, top }}>
        <img style={{width: '100px'}} src={require('../../assets/images/april15-05-ru.jpg')}/>
      </div>,
    );
  }
}
