import { h, Component } from 'preact';
import style from './style.less';
import Uploader from "../uploader";
import Social from "../social_btns";
import DragSpace from "../drag_space";
import Cropper from "../cropper";
import { connect } from 'preact-redux';

import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

@connect(state => state)
@DragDropContext(HTML5Backend)
export default class Home extends Component {
	render() {
	    console.log('this P', this.props.social);
		return (
			<div class={style.home}>
				<p>Width: {this.props.social.w} Height: {this.props.social.h}</p>
				<Uploader/>
				<Social />
				<DragSpace />
				<Cropper />
			</div>
		);
	}
}
