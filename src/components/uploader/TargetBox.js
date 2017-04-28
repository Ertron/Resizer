import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'preact-redux';
import style from './targetBoxStyle.less';

const boxTarget = {
    drop(props, monitor, component) {
        if (props.onDrop) {
            props.onDrop(props, monitor);
        }
    },
};

@DropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
@connect(state => state)
export default class TargetBox extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
        onDrop: PropTypes.func,
    };
    labelStyle(value){
        let result = style.custom_upload_btn_div + ' ' + style.activated;
        if(value){
            result = style.custom_upload_btn_div;
        }
        return result;
    }
    addFile(event){
        var f = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
            console.log(" F : ", event);
            this.props.dispatch({
                type: 'ADD_FILE',
                url: event.target.result
            });
        };
        reader.readAsDataURL(f);
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        return connectDropTarget(
            <label class={style.custom_upload_btn_label}>
                <input onChange={(e) => this.addFile(e)} class={style.custom_upload_btn_input} type="file" accept="image/*"/>
                <div class={ isActive ? this.labelStyle(true) : this.labelStyle(false) }>
                    <span>UPLOAD LOGO</span>
                </div>
            </label>
        );
    }
}