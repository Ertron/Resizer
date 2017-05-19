import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import Box from './Box';
import { connect } from 'preact-redux';


const boxSource = {
    beginDrag(props, monitor) {
    let { id, title, left, top } = props;
        console.log('BEGIN DRAG PROPS : ', props);
    if(left < - props.calc_params.indent_left){
        left = - props.calc_params.indent_left;
        /*console.error("test LEFT < : ", left);*/
    }
    if(left > props.calc_params.indent_left){
        left = props.calc_params.indent_left;
        /*console.error("test LEFT > : ", left);*/
    }
    if(top > props.calc_params.indent_top){
        top = props.calc_params.indent_top;
        /*console.error("test TOP > : ", top);*/
    }
    if(top < - props.calc_params.indent_top){
        top = - props.calc_params.indent_top;
        /*console.error("test TOP < : ", top);*/
    }
    return { id, title, left, top };
    },
    endDrag(props, monitor){
        if (!monitor.didDrop()) {
            // You can check whether the drop was successful
            // or if the drag ended but nobody handled the drop
            console.error('endDrag ! ');
            return;
        }
    },
    isDragging(props){
    /*return props.allow_drag;*/
    return true;
    },
    /*canDrag(props){
        if(props.calc_params.indent_left >= props.left){
            console.log('CAN DRAG : ', props);
            return true;
        }
        console.log('CAN"T DRAG : ', props);
        return false;
    }*/
};


@connect(state => state)
@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
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
    constructor(props) {
        super(props);
        this.getStyles = this.getStyles.bind(this);

    }
    getStyles(props) {
        let { left, top, isDragging } = props;
        left = left - props.calc_params.indent_left;
        /*console.log('LEFT AFTER : ', left);*/
        top = top - props.calc_params.indent_top;
        if(left < - props.calc_params.indent_left * 2){
            /*console.error("test LEFT < : ", left);*/
            left = - props.calc_params.indent_left * 2;
            /*console.error("test LEFT < : ", left);*/
        }
        if(left > 0){
            /*console.error("test LEFT > 0 : ", left);*/
            left = 0;
        }
        if(top < - props.calc_params.indent_top * 2){
            /*console.error("test TOP < : ", left);*/
            top = - props.calc_params.indent_top * 2;
            /*console.error("test TOP < : ", left);*/
        }
        if(top > 0){
            /*console.error("test TOP > 0 : ", left);*/
            top = 0;
        }

        /*console.info('=====>>>>>>> getStyles: ', {x: left, y: top});*/
        /*console.info('Left : ', left, ' Top : ', top);
        console.error(this);*/
        /*console.error(props);*/

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
  componentDidMount(){
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });

  }
  componentWillUpdate(){
      /*console.error('componentWillUpdate : ', this);*/
  }
    componentDidUpdate(){
        /*console.error('componentDidUpdate : ', this);*/
        /*this.props.dispatch({
            type: 'SET_CROP_OFFSET',
            coords: {x: 33, y: 55}
        });*/
    }

  render(){
    const { title, connectDragSource } = this.props;
    return connectDragSource(
      <div id="draggableBox"  style={this.getStyles(this.props)}>
        <Box title={title} />
      </div>,
    );
  }
}
