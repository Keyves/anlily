import 'es6-shim'
import React from 'react'
import { render } from 'react-dom'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { customStore } from 'app/utils'
import * as reducers from 'app/redux/reducers'
import App from './App'

const store = customStore(combineReducers(reducers))

document.addEventListener('DOMContentLoaded', () => {
	var div = document.createElement('div')
	div.id = 'root'
	document.body.appendChild(div)

	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	)
})
