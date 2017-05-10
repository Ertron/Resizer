import { h, Component } from 'preact';
import Container from './Container';
import CustomDragLayer from './CustomDragLayer';
import { connect } from 'preact-redux';

@connect(state => state)
export default class DragAroundCustomDragLayer extends Component {
  constructor(props) {
    super(props);

  }
  setOffsets(left, top){
      this.props.dispatch({
          type: 'SET_OFFSET',
          params: {left: left, top: top}
      });
  }
    componentDidMount() {
        this.setOffsets(this.base.offsetLeft, this.base.offsetTop);
    }
    componentDidUpdate(){
        console.log('this.base : ', this.base.getBoundingClientRect());
        if(this.base.offsetLeft != this.props.offset.left || this.base.offsetTop != this.props.offset.top){
            this.setOffsets(this.base.offsetLeft, this.base.offsetTop);
        }
    }
  render() {
    return (
          <div id="soc_container" style={{
              position: 'relative',
              overflow: 'hidden',
              zIndex: 500,
              width: this.props.social.w,
              height: this.props.social.h,
              float: 'right',
              margin: '0 400px 0 0'
          }}>
              <Container />
              <CustomDragLayer />
          </div>
    );
  }
  }
