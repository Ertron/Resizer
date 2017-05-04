import { h, Component } from 'preact';
import Container from './Container';
import CustomDragLayer from './CustomDragLayer';
import { connect } from 'preact-redux';

@connect(state => state)
export default class DragAroundCustomDragLayer extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
          <div style={{width: '700px', float: 'right'}}>
              <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 500,
                  width: this.props.social.w,
                  height: this.props.social.h,
              }}>
                  <Container />
                  <CustomDragLayer />
              </div>
          </div>
      </div>
    );
  }
  }
