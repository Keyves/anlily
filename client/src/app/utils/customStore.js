import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


export default function customStore(rootReducer) {
	let buildStore = compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);

	const store = buildStore(rootReducer);

	if(module.hot) {
		module.hot.accept(rootReducer, () => {
			store.replaceReducer(rootReducer);
		});
	}
	return store;
}
