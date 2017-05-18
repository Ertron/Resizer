import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import Box from './Box';
import { connect } from 'preact-redux';

function getStyles(props) {
    let { left, top, isDragging } = props;
    left = left - props.calc_params.indent_left;
    top = top - props.calc_params.indent_top;
    if(left < - props.calc_params.indent_left * 2){
        left = - props.calc_params.indent_left * 2;
    }
    if(left > 0){
        left = 0;
    }
    if(top < - props.calc_params.indent_top * 2){
        top = - props.calc_params.indent_top * 2;
    }
    if(top > 0){
        top = 0;
    }
    /*this.props.dispatch({
        type: 'SET_CROP_OFFSET',
        coords: {x: 33, y: 55}
    });*/
    /*console.info('Left : ', left, ' Top : ', top);*/
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
const boxSource = {
    beginDrag(props) {
    let { id, title, left, top } = props;
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
    /*console.info('BEGIN DRAG PROPS : ', props);*/
    return { id, title, left, top };
    },
    /*endDrag(props, monitor){
        console.log('END DRAG PROPS : ', props);
        console.info('Left : ', props.left, ' Top : ', props.top);
         props.dispatch({
            type: 'SET_CROP_OFFSET',
            coords: {x: 33, y: 55}
         });
    },*/
    isDragging(props){
    /*console.log("TEST DDRAGGGGING  PROPS : ", props);*/
    /*return props.allow_drag;*/
    return true;
    },
    /*canDrag(props){
        return props.allow_drag;
    }*/
};


@connect(state => state)
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
