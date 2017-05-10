import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import ItemTypes from './ItemTypes';
import Box from './Box';

const boxSource = {
  beginDrag(props) {
    const { id, title, left, top } = props;
    console.info('BEGIN DRAG PROPS : ', props);
    return { id, title, left, top };
  },
  endDrag(props){
    /*console.log('END DRAG PROPS : ',props);*/
  },
};

function getStyles(props) {
  let { left, top, isDragging } = props;
  /*if(top < 0){
      top = 0;
  }*/
  if(left < 0){
    left = 0;
  }
  /*if(left > 150){
    left = 150;
  }*/
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
}

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
export default class DraggableBox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }
  componentWillUpdate(){
      console.error('componentWillMount : ', this);
  }

  render() {
    const { title, connectDragSource } = this.props;
    return connectDragSource(
      <div id="draggableBox" style={getStyles(this.props)}>
        <Box title={title} />
      </div>,
    );
  }
}
