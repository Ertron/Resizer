import { h, Component } from 'preact';
import { Provider } from 'preact-redux';

import Container from './container';

import store from '../lib/store';

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Container />
			</Provider>
		);
	}
}
