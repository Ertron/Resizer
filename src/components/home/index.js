import { h, Component } from 'preact';
import style from './style.less';
import Preview from "../preview";
import Uploader from "../uploader";
import Social from "../social_btns";
import Test from "../test";

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<Preview />
				<Uploader/>
				<Social/>
				{/*<Test/>*/}
			</div>
		);
	}
}
