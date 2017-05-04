import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: -820,
  top: -209,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
    /*console.log('getItemStyles : ', props);*/
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
      return {
          display: 'none',
      };
  }


  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
export default class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,

  };

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.BOX:
        return (<BoxDragPreview title={item.title} />);
      default:
        return null;
    }
  }

  render() {
    let { item, itemType, isDragging, currentOffset } = this.props;


    /*if(this.props.currentOffset != null && this.props.currentOffset.x <= 0){
        console.info('PROPSSS : ', item);
        item.left = 0;
    }*/

    if (!isDragging || !currentOffset) {
        return null;
    }


    if(isDragging){
        console.error('dddddddddd : ', this.props);
        if(currentOffset.x < 0){
          currentOffset.x = 0;
        }
        /*if(currentOffset.y < 249){
            currentOffset.y = 249;
        }
        if(currentOffset.x > 150){
            currentOffset.x = 150;
        }*/


    }

    /*console.log("ITEM : ", item);*/

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}
