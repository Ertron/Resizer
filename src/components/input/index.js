import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.less';

@connect(state => state)
export default class Input extends Component {
	addFile(event){
		var f = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
            this.props.dispatch({
				type: 'ADD_FILE',
				url: event.target.result
			});
        };
        reader.readAsDataURL(f);
	}
    dragOvered(event, state){
        this.props.dispatch({
            type: 'IS_OVERED',
            is_overed: state
        });
		return false;
	}
	labelStyle(value){
    	let result = style.custom_upload_btn_div + ' ' + style.activated;
    	if(value){
            result = style.custom_upload_btn_div;
		}
		return result;
	}
	render(props) {
	    return (<div
			onDragOver={(e)=> this.dragOvered(e, true)}
			onDragLeave={(e)=> this.dragOvered(e, false)}
		>
            {!props.is_loading ?
				<label class={style.custom_upload_btn_label}>
					<input onChange={(e) => this.addFile(e)} class={style.custom_upload_btn_input} type="file" accept="image/*"/>
						<div class={!props.is_overed ? this.labelStyle(true) : this.labelStyle(false)}>
							<span>UPLOAD IMAGE</span>
						</div>
				</label>
				: false}
        </div>);
	}
}
