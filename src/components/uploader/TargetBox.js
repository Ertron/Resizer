import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'preact-redux';
import style from './targetBoxStyle.less';
import checkFileSize from '../../utils/upload_file_size_control';
import { social_objects } from '../../lib/social_buttons';

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
        let f = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image;
            img.onload = ()=> {
                if(!checkFileSize(social_objects, img.width, img.height)){
                    alert('WRONG IMG SIZE');
                    return false;
                }
                this.props.dispatch({
                    type: 'ADD_FILE',
                    fileprops: {
                        url: event.target.result,
                        width: img.width,
                        height: img.height,
                    }
                });
            };

            img.src = event.target.result;
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