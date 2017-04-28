import { h, Component } from 'preact';
import style from './style.less';
import { connect } from 'preact-redux';

@connect(state => state)
export default class Preview extends Component {
	render() {
        if(this.props.is_loading == false){
            return (
                <div class={style.peview_container}>
                    <img style={{width: '100%', height: '100%'}} src={this.props.file}/>
                </div>
            );
        }
	}
}
