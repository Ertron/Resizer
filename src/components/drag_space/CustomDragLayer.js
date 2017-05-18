import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';
import { connect } from 'preact-redux';

const layerStyles = function (object, props){
    /* JUMP BUG CHECKED !!! */
    let tops = object.top ;
    let lefts =  object.left;
    return {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 100,
        left: lefts,
        top: tops,
        width: '100%',
        height: '100%',
    }
};

/*function getItemStyles(props) {
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
}*/

function calcPosition(props) {
    /* JUMP BUG CHECKED !!! */

    let left = props.item.left + props.diff.x - props.calc_params.indent_left;
    let top = props.item.top + props.diff.y - props.calc_params.indent_top;
    console.log('calcPosition : LEFT : ',left,' item.left : ',props.item.left,' props.diff.x : ',props.diff.x,' props.calc_params.indent_left : ',props.calc_params.indent_left);
    if(left < - props.calc_params.indent_left * 2){
        left = -props.calc_params.indent_left * 2;
    }
    if(top < - props.calc_params.indent_top * 2){
        top = - props.calc_params.indent_top * 2;
    }
    if(left > 0){
        left = 0;
    }
    if(top > 0){
        top = 0;
    }
    return {
        left: left,
        top: top
    }
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
    let { item, itemType, isDragging, currentOffset, initialOffset, clientOffset, diff, canDrag } = this.props;
      /*console.log(this.props.clientOffset, currentOffset);*/
      /*console.log("currentOffset : ", currentOffset, " initialClOffset : ", this.props.initialClOffset, " initialOffset : ", initialOffset, " clientOffset : ", this.props.clientOffset);*/
      /*console.info("diff : ", this.props.diff);*/
    if (!isDragging || !currentOffset) {
        return null;
    }


    if(isDragging){
        /*console.log("TEST DDRAGGGGING  PROPS : ", this.props);*/
        /*console.log("currentOffset DDRAGGGGING  PROPS : ", this.props.currentOffset);
        console.log("diff DDRAGGGGING  PROPS : ", this.props.diff);*/
        /*console.info('<<<<< : ', item.left);*/
        /*if(currentOffset.x < this.props.offset.left - (this.props.calc_params.indent_left * 2)) {
            currentOffset.x = this.props.offset.left - (this.props.calc_params.indent_left * 2);
            item.left = - this.props.calc_params.indent_left;
            console.error(" my IF : ", this.props);
        }*/
        /*console.info('>>>>> : ', item.top);*/
        /*if(currentOffset.x < this.props.offset.left - this.props.calc_params.indent_left){
           currentOffset.x = this.props.offset.left - this.props.calc_params.indent_left;
           item.left = - this.props.calc_params.indent_left;
            this.props.dispatch({
                type: 'ALLOW_DRAG',
                allow_drag_state: false
            });
           /!*console.info('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< : ', this.props);*!/
        }
        else if(currentOffset.y < this.props.offset.top - this.props.calc_params.indent_top){
            currentOffset.y = this.props.offset.top - this.props.calc_params.indent_top;
            item.top = - this.props.calc_params.indent_top;
            this.props.dispatch({
                type: 'ALLOW_DRAG',
                allow_drag_state: false
            });
        }
        else{
            this.props.dispatch({
                type: 'ALLOW_DRAG',
                allow_drag_state: true
            });
            console.error('dddddddddd : ', this.props);
        }*/
    }
      /*console.error('dddddddddd : ', this.props);*/
    return (
        <div style={layerStyles(calcPosition(this.props))}>
            {this.renderItem(itemType, item)}
        </div>
    );
  }
}
