import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';
import { connect } from 'preact-redux';

const layerStyles = function (left, top){
    let tops = top;
    let lefts =  left;

    /*console.log({ top, left });*/
    return {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 100,
        left: lefts,
        top: tops,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    }
};

function getItemStyles(props) {
    // console.log('getItemStyles : ', props);
  const { initialOffset, currentOffset } = props;
  // console.log(initialOffset, currentOffset);
  if (!initialOffset || !currentOffset) {
      return {
          display: 'none',
      };
  }


  let { x, y } = currentOffset;
  const transform = `translate(0px, 0px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  initialClOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getSourceClientOffset(), // block coord
  clientOffset: monitor.getClientOffset(), //mouse coord
  isDragging: monitor.isDragging(),
  diff: monitor.getDifferenceFromInitialOffset(),
}))
@connect(state => state)
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
    constructor(props) {
        super(props);
        this.setState({
            somestate: this.props.offset
        });

    }

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.BOX:
        return (<BoxDragPreview title={item.title} />);
      default:
        return null;
    }
  }

  render() {
    let { item, itemType, isDragging, currentOffset, initialOffset, clientOffset, diff } = this.props;
      /*console.log(this.props.clientOffset, currentOffset);*/
      /*console.log("currentOffset : ", currentOffset, " initialClOffset : ", this.props.initialClOffset, " initialOffset : ", initialOffset, " clientOffset : ", this.props.clientOffset);*/
      /*console.info("diff : ", this.props.diff);*/
    if (!isDragging || !currentOffset) {
        return null;
    }


    if(isDragging){
        /*console.error('dddddddddd : ', this.props);*/
        if(currentOffset.x < 0){
           currentOffset.x = 0;
        }


    }
      console.error('dddddddddd : ', this.props);
    return (
        <div style={layerStyles(item.left + diff.x, item.top + diff.y)}>
            {this.renderItem(itemType, item)}
        </div>
    );
  }
}
